import Service from '@services/template';
import { Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { BaseMediaM2MController } from '@media-master/express-crud-router';
import {
    Tables,
    TableName,
} from '@types';

export class MediaM2MController<T> extends BaseMediaM2MController {
    protected service: Service<T>;
    protected resource: TableName;
    protected createSchema: ZodSchema;
    protected requiresUser: boolean;
    protected resourceId: string;

    constructor({
        resource,
        createSchema,
        updateSchema,
        requiresUser = false,
    }: {
        resource: TableName;
        createSchema: ZodSchema;
        updateSchema?: ZodSchema;
        requiresUser?: boolean;
    }) {
        super();
        this.service = new Service<T>(`media${requiresUser ? '_user' : ''}_${resource}`);
        this.resource = resource;
        this.createSchema = createSchema;
        this.requiresUser = requiresUser;
        this.resourceId = `${resource}_id`;

        if(updateSchema) {
            this.update = async (req: Request, res: Response) => {
                const { mediaId, id } = req.params;
                const body = updateSchema.parse(req.body) as T;
                await this.validateDependencies(body as Record<string, unknown>);

                const response = await this.service.update({
                    body,
                    filters: this.filters(req, mediaId, {
                        [this.resourceId]: id,
                    }),
                }) as object;
                return res.ok(response);
            };
        }
    }

    private filters(req: Request, mediaId?: string, filters: Record<string, unknown> = {}): Record<string, unknown> {
        return {
            ...filters,
            ...(mediaId ? { media_id: mediaId } : {}),
            ...(this.requiresUser ? { user_id: req.userId } : {}),
        };
    }

    private async validateDependencies(body: Record<string, unknown>) {
        const checks: Array<{
            table: TableName;
            field: string;
        }> = [
            {
                table: 'media',
                field: 'media_id',
            },
            {
                table: this.resource,
                field: this.resourceId,
            },
        ];

        await Promise.all(
            checks.map(async ({ table, field }) => {
                const value = body[field];
                if (!value) return;

                const service = new Service<Tables<typeof table>>(table);
                await service.read({
                    single: true,
                    filters: { id: value },
                });
            })
        );
    }

    public readAll = async (req: Request, res: Response) => {
        const response = await this.service.read({
            filters: this.filters(req),
        }) as object;
        return res.ok(response);
    };

    public readById = async (req: Request, res: Response) => {
        const { mediaId, id } = req.params;
        const response = await this.service.read({
            single: true,
            filters: this.filters(req, mediaId, {
                [this.resourceId]: id,
            }),
        }) as object;
        return res.ok(response);
    };

    public create = async (req: Request, res: Response) => {
        const body = this.createSchema.parse({
            ...req.body,
            ...(this.requiresUser ? { user_id: req.userId } : {}),
        }) as T;
        await this.validateDependencies(body as Record<string, unknown>);

        const response = await this.service.create({ body }) as object;
        return res.created(response);
    };

    public delete = async (req: Request, res: Response) => {
        const { mediaId, id } = req.params;
        await this.service.delete({
            filters: this.filters(req, mediaId, {
                [this.resourceId]: id,
            }),
        });
        return res.noContent();
    };
}
