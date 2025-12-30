import Service from '@services/template';
import { Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { BaseController } from '@media-master/express-crud-router';

export class Controller<T> extends BaseController {
    private service: Service<T>;
    private createSchema: ZodSchema;
    private updateSchema: ZodSchema;
    private requiresUser: boolean;
    private idField: string;
    private nameField: string;
    private isMediaType: boolean;
    private validateForTable: string;
    private dependencyInDelete: boolean;
    private userDependency: boolean;

    constructor({
        resource,
        createSchema,
        updateSchema,
        requiresUser = false,
        idField = 'id',
        nameField = 'name',
        isMediaType = false,
        validateForTable = '',
        dependencyInDelete = true,
        userDependency = false,
        noDelete = false,
    }: {
        resource: string;
        createSchema: ZodSchema;
        updateSchema: ZodSchema;
        requiresUser?: boolean;
        idField?: string;
        nameField?: string;
        isMediaType?: boolean;
        validateForTable?: string;
        dependencyInDelete?: boolean;
        userDependency?: boolean;
        noDelete?: boolean;
    }) {
        super();
        this.service = new Service(resource);
        this.createSchema = createSchema;
        this.updateSchema = updateSchema;
        this.requiresUser = requiresUser;
        this.idField = idField;
        this.nameField = nameField;
        this.isMediaType = isMediaType;
        this.validateForTable = validateForTable;
        this.dependencyInDelete = dependencyInDelete;
        this.userDependency = userDependency;

        if (!noDelete) {
            this.delete = async (req: Request, res: Response) => {
                // TODO: handle dependencies, use this.dependencyInDelete and this.userDependency

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
            ...(this.requiresUser ? { userid: req.userId } : {}),
        };
    };

    public readAll = async (req: Request, res: Response) => {
        const response = await this.service.read({
            filters: this.filters(req),
        })
        return res.ok(response as object);
    };

    public readById = async (req: Request, res: Response) => {
        const response = await this.service.read({
            single: true,
            filters: this.filters(req, {
                [this.idField]: req.params.id,
            }),
        })
        return res.ok(response as object);
    };

    public readByName = async (req: Request, res: Response) => {
        const response = await this.service.read({
            single: true,
            filters: this.filters(req, {
                [this.nameField]: req.query?.query ?? '',
            }),
        })
        return res.ok(response as object);
    };

    public create = async (req: Request, res: Response) => {
        const body = this.createSchema.parse({
            ...req.body,
            ...(this.requiresUser ? { userid: req.userId } : {}),
        }) as T;

        // TODO: Handle relationships, assure a foreign key is valid in the table specified in this.validateForTable
        // TODO: Handle media types, use this.isMediaType

        const response = await this.service.create({ body });
        return res.created(response as object);
    };

    public update = async (req: Request, res: Response) => {
        const body = this.updateSchema.parse(req.body) as T;

        // TODO: Handle relationships, assure a foreign key is valid in the table specified in this.validateForTable

        const response = await this.service.update({
            body,
            filters: this.filters(req, {
                [this.idField]: req.params.id,
            })
        })
        return res.ok(response as object);
    };
};

