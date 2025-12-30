import Service from '@services/template';
import { Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { BaseController } from '@media-master/express-crud-router';
import {
    Tables,
    TableName,
} from '@types';

export class Controller<T> extends BaseController {
    private service: Service<T>;
    private createSchema: ZodSchema;
    private updateSchema: ZodSchema;
    private requiresUser: boolean;
    private idField: string;
    private nameField: string;
    private isMediaType: boolean;
    private assureExistanceInTable: TableName;
    private deleteDependencies: boolean;
    private tableDependencies: TableName[];

    constructor({
        resource,
        createSchema,
        updateSchema,
        requiresUser = false,
        idField = 'id',
        nameField = 'name',
        isMediaType = false,
        assureExistanceInTable = '',
        deleteDependencies = true,
        tableDependencies = [],
        noDelete = false,
        noReadByName = false,
    }: {
        resource: string;
        createSchema: ZodSchema;
        updateSchema: ZodSchema;
        requiresUser?: boolean;
        idField?: string;
        nameField?: string;
        isMediaType?: boolean;
        assureExistanceInTable?: TableName;
        deleteDependencies?: boolean;
        tableDependencies?: TableName[];
        noDelete?: boolean;
        noReadByName?: boolean
    }) {
        super();
        this.service = new Service(resource);
        this.createSchema = createSchema;
        this.updateSchema = updateSchema;
        this.requiresUser = requiresUser;
        this.idField = idField;
        this.nameField = nameField;
        this.isMediaType = isMediaType;
        this.assureExistanceInTable = assureExistanceInTable;
        this.deleteDependencies = deleteDependencies;
        this.tableDependencies = tableDependencies;

        if(!noReadByName) {
            this.readByName = async (req: Request, res: Response) => {
                const response = await this.service.read({
                    single: true,
                    filters: this.filters(req, {
                        [this.nameField]: req.query?.query ?? '',
                    }),
                }) as object;
                return res.ok(response);
            };
        }

        if (!noDelete) {
            this.delete = async (req: Request, res: Response) => {
                if (this.deleteDependencies) {
                    await this.service.handleDependencies({
                        tables: this.tableDependencies,
                        id: req.params.id,
                    });
                }

                await this.service.delete({
                    filters: this.filters(req, {
                        [this.idField]: req.params.id,
                    }),
                });
                return res.noContent();
            };
        }
    };

    protected filters(req: Request, filters: Record<string, unknown> = {}): Record<string, unknown> {
        return {
            ...filters,
            ...(this.requiresUser ? { user_id: req.userId } : {}),
        };
    };

    private async assertDependencyExists(id: string) {
        if (!this.assureExistanceInTable) return;

        const service = new Service<Tables<typeof this.assureExistanceInTable>>(this.assureExistanceInTable);
        await service.read({
            single: true,
            filters: {
                id,
            },
        });
    };

    public readAll = async (req: Request, res: Response) => {
        const response = await this.service.read({
            filters: this.filters(req),
        }) as object;
        return res.ok(response);
    };

    public readById = async (req: Request, res: Response) => {
        const response = await this.service.read({
            single: true,
            filters: this.filters(req, {
                [this.idField]: req.params.id,
            }),
        }) as object;
        return res.ok(response);
    };

    public create = async (req: Request, res: Response) => {
        const body = this.createSchema.parse({
            ...req.body,
            ...(this.requiresUser ? { user_id: req.userId } : {}),
        }) as T;

        if (this.assureExistanceInTable) {
            /* eslint-disable  @typescript-eslint/no-explicit-any */
            await this.assertDependencyExists((body as any)[this.idField]);
        }

        // TODO: Handle media types, use this.isMediaType

        const response = await this.service.create({ body }) as object;
        return res.created(response);
    };

    public update = async (req: Request, res: Response) => {
        const body = this.updateSchema.parse(req.body) as T;

        if (this.assureExistanceInTable) {
            await this.assertDependencyExists(req.params.id);
        }

        const response = await this.service.update({
            body,
            filters: this.filters(req, {
                [this.idField]: req.params.id,
            })
        }) as object;
        return res.ok(response);
    };
};

