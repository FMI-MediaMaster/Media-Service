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
    private tableMediaDependenciesToIdMap: Partial<Record<TableName, string>>;

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
        tableMediaDependenciesToIdMap = {},
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
        tableMediaDependenciesToIdMap?: Partial<Record<TableName, string>>;
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
        this.tableMediaDependenciesToIdMap = tableMediaDependenciesToIdMap;

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
                    const mediaService = new Service<Tables<'media'>>('media');
                    const mediaRows = await mediaService.read({
                        filters: this.filters(req, { name: req.query?.query ?? '' }),
                    }) as Tables<'media'>[];

                    if (!mediaRows || mediaRows.length === 0) {
                        return res.notFound('Invalid name');
                    }

                    const mediaIds = mediaRows.map(media => media.id);
                    const resourceRow = await this.service.read({
                        single: true,
                        filters: this.filters(req, { media_id: mediaIds }),
                    }) as object;
                    
                    const { media_type, id, ...media } = mediaRows.find(m => m.id === (resourceRow as any).media_id) as Tables<'media'>;
                    response = {
                        ...resourceRow,
                        ...media,
                    };
                } else {
                    response = await this.service.read(params) as object;
                }
                return res.ok(response);
            };
        }

        if (!noDelete) {
            this.delete = async (req: Request, res: Response) => {
                if (Object.keys(this.tableDependenciesToIdMap).length !== 0) {
                    await this.service.handleDependencies({
                        tableToIdMap: this.tableDependenciesToIdMap,
                        id: req.params.id,
                    });
                }

                let mediaId;
                if (this.isMediaType) {
                    const record = await this.service.read({
                        single: true,
                        filters: this.filters(req, {
                            [this.idField]: req.params.id,
                        }),
                    });
                    mediaId = (record as any)?.media_id;

                    await this.service.handleDependencies({
                        tableToIdMap: this.tableMediaDependenciesToIdMap,
                        id: mediaId,
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
                        id: mediaId,
                    });
                }
                return res.noContent();
            };
        }
    };

    private filters(req: Request, filters: Record<string, unknown> = {}, addUser = this.requiresUser): Record<string, unknown> {
        return {
            ...filters,
            ...(addUser ? { user_id: req.userId } : {}),
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
        let response: object;
        if(this.isMediaType) {
            const mediaUserService = new Service<Tables<'media_user'>>('media_user');
            const mediaService = new Service<Tables<'media'>>('media');
            
            const mediaUserItems = await mediaUserService.read({
                filters: this.filters(req, {}, true),
            }) as Tables<'media_user'>[];

            if (!mediaUserItems || mediaUserItems.length === 0) {
                return res.ok([]);
            }

            const mediaIds = mediaUserItems.map(item => item.media_id);
            const medias = await mediaService.read({
                filters: {
                    id: mediaIds,
                    media_type: this.resource
                },
            }) as Tables<'media'>[];

            response = await Promise.all(
                medias.map(async (media) => {
                    const { media_type, id, ...cleanMedia } = media;
                    console.log(media);
                    const resourceData = await this.service.read({
                        single: true,
                        filters: this.filters(req, {
                            media_id: media.id,
                        }),
                    }) as object;

                    return {
                        ...resourceData,
                        ...cleanMedia,
                    };
                })
            );
        }
        else {
            response = await this.service.read({
                filters: this.filters(req),
            }) as object;
        }
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
            await this.assertDependencyExists((body as any)[`${this.assureExistanceInTable}_id`]);
        }

        const response = this.isMediaType
            ? await createMediaType({
                ...body,
                user_id: req.userId,
                media_type: this.resource,
            }) as object
            : await this.service.create({ body }) as object;
        return res.created(response);
    };

    public update = async (req: Request, res: Response) => {
        const body = this.updateSchema.parse(req.body) as T;
        const response = await this.service.update({
            body,
            filters: this.filters(req, {
                [this.idField]: req.params.id,
            })
        }) as object;
        return res.ok(response);
    };
};

