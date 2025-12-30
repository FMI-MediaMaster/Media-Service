import Service from '@services/template';
import { Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { BaseController } from '@media-master/express-crud-router';
import { createMediaType } from '@utils/media';
import {
    Tables,
    TableName,
} from '@types';

export class Controller<T> extends BaseController {
    private service: Service<T>;
    private resource: TableName;
    private createSchema: ZodSchema;
    private updateSchema: ZodSchema;
    private requiresUser: boolean;
    private idField: string;
    private nameField: string;
    private isMediaType: boolean;
    private assureExistanceInTable: TableName | '';
    private tableDependenciesToIdMap: Partial<Record<TableName, string>>;

    constructor({
        resource,
        createSchema,
        updateSchema,
        requiresUser = false,
        idField = 'id',
        nameField = 'name',
        isMediaType = false,
        assureExistanceInTable = '',
        tableDependenciesToIdMap = {},
        noDelete = false,
        noReadByName = false,
    }: {
        resource: TableName;
        createSchema: ZodSchema;
        updateSchema: ZodSchema;
        requiresUser?: boolean;
        idField?: string;
        nameField?: string;
        isMediaType?: boolean;
        assureExistanceInTable?: TableName | '';
        tableDependenciesToIdMap?: Partial<Record<TableName, string>>;
        noDelete?: boolean;
        noReadByName?: boolean
    }) {
        super();
        this.service = new Service(resource);
        this.resource = resource;
        this.createSchema = createSchema;
        this.updateSchema = updateSchema;
        this.requiresUser = requiresUser;
        this.idField = idField;
        this.nameField = nameField;
        this.isMediaType = isMediaType;
        this.assureExistanceInTable = assureExistanceInTable;
        this.tableDependenciesToIdMap = tableDependenciesToIdMap;

        if(!noReadByName) {
            this.readByName = async (req: Request, res: Response) => {
                const params = {
                    single: true,
                    filters: this.filters(req, {
                        [this.nameField]: req.query?.query ?? '',
                    }),
                };

                let response: object;
                if (this.isMediaType) {
                    const mediaResponse = await new Service<Tables<'media'>>('media').read(params) as Tables<'media'> | null;
                    if (!mediaResponse?.id) {
                        return res.ok(mediaResponse as object);
                    }
                    const { media_type, ...cleanMediaResponse } = mediaResponse;
                    
                    const gameResponse = await this.service.read({
                        single: true,
                        filters: this.filters(req, {
                            'media_id': cleanMediaResponse['id'],
                        }),
                    }) as object;
                    console.log(gameResponse);

                    response = {
                        ...cleanMediaResponse,
                        ...gameResponse,
                    };
                } else {
                    response = await this.service.read(params) as object;
                }
                return res.ok(response);
            };
        }

        if (!noDelete) {
            this.delete = async (req: Request, res: Response) => {
                if (Object.keys(this.tableDependenciesToIdMap).length === 0) {
                    await this.service.handleDependencies({
                        tableToIdMap: this.tableDependenciesToIdMap,
                        id: req.params.id,
                    });
                }

                await this.service.delete({
                    filters: this.filters(req, {
                        [this.idField]: req.params.id,
                    }),
                });

                if (this.isMediaType) {
                    await this.service.handleDependencies({
                        tableToIdMap: { 'media': 'id' },
                        id: req.params.id,
                    });
                }
                return res.noContent();
            };
        }
    };

    private filters(req: Request, filters: Record<string, unknown> = {}): Record<string, unknown> {
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

        const response = this.isMediaType
            ? await createMediaType({
                ...body,
                'media_type': this.resource,
            }) as object
            : await this.service.create({ body }) as object;
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

