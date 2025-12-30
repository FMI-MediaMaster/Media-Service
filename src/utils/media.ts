import Service from '@services/template';
import { Mutex } from 'async-mutex';
import {
    Tables,
    TableName,
} from '@types';

type Body = Record<string, any>;
type Result = Record<string, any>;

const createAttributes = (tableName: TableName, entry: any) =>
    tableName === 'link' ? entry : { name: entry };

const getPlural = (mediaType: string) => {
    return {
        book: 'books',
        game: 'games',
        movie: 'movies',
    }[mediaType] ?? mediaType;
};

const removeIfEmpty = (result: Result, key: string) => {
    if (result[key] && result[key].length === 0) {
        delete result[key];
    }
};

const addToList = async (list: any[], value: any, mutex: Mutex) => {
    await mutex.runExclusive(async () => list.push(value));
};

const setInResultIfNotEmpty = async (
    result: Result,
    key: string,
    value: any,
    mutex: Mutex
) => {
    if (value && value.length > 0) {
        await mutex.runExclusive(async () => (result[key] = value));
    }
};

const splitBody = (body: Body) => {
    const result: Record<string, Body> = {};
    const mediaType = body.media_type;
    const mapping: Record<string, string[]> = {
        genresBody: ['genres'],
        creatorsBody: ['creators'],
        publishersBody: ['publishers'],
        platformsBody: ['platforms'],
        linksBody: ['links'],
        retailersBody: ['retailers'],
        seriesBody: ['series_name'],
        mediaseriesBody: ['series'],
        seasonsBody: ['seasons'],
        mediaBody: [
            'name',
            'description',
            'release_date',
            'critics_score',
            'community_score',
            'media_type',
        ],
    };

    for (const [key, fields] of Object.entries(mapping)) {
        result[key] = {};
        for (const field of fields) {
            if (body[field]) {
                result[key][field] = body[field];
            }
            delete body[field];
        }
    }

    result[`${mediaType}Body`] = body;
    return result;
};

const createResources = async (
    body: Body,
    mediaId: number,
    resource: string,
    media_resource: string,
) => {
    const result: Record<string, any[]> = {
        [resource]: [],
        [media_resource]: [],
    };

    const entries = body[resource] ?? [];
    if (!Array.isArray(entries) || entries.length === 0) {
        return result;
    }

    const resourceTableName = resource.slice(0, -1) as TableName;
    const mediaResourceTableName = media_resource as TableName;

    const mutex = new Mutex();
    const service = new Service<Tables<typeof resourceTableName>>(resourceTableName);
    const mediaService = new Service<Tables<typeof mediaResourceTableName>>(mediaResourceTableName);

    const tasks = entries.map(async (entry: any) => {
        const attributes = createAttributes(resourceTableName, entry);
        let record: any;
        try {
            record = await service.read({ single: true, filters: { name: attributes.name } });
        } catch {
            record = await service.create({ body: attributes });
            await addToList(result[resource], record, mutex);
        }

        const mediaRecord = await mediaService.create({
            body: { media_id: mediaId, [`${resourceTableName}_id`]: record.id } as Tables<typeof mediaResourceTableName>,
        });
        await addToList(result[media_resource], mediaRecord, mutex);
    });

    await Promise.all(tasks);
    return result;
};

export const createMediaType = async (initialBody: Body) => {
    const mediaType: TableName = initialBody.media_type;
    const mediaTypePlural = getPlural(mediaType);
    const resources = [
        'links',
        'genres',
        'creators',
        'platforms',
        'retailers',
        'publishers',
    ];
    const result: Result = {
        series: [],
        related_medias: [],
        [`related_${mediaTypePlural}`]: [],
        media_series: [],
        seasons: [],
    };

    const body = splitBody(initialBody);
    const resultMutex = new Mutex();

    // Create media
    const mediaService = new Service<Tables<'media'>>('media');
    result.media = await mediaService.create({ body: body.mediaBody as Tables<'media'> });

    // Create mediaType entry
    const typeService = new Service<Tables<typeof mediaType>>(mediaType);
    body[`${mediaType}Body`].media_id = result.media.id;
    const typeRecord = await typeService.create({ body: body[`${mediaType}Body`] as Tables<typeof mediaType> });
    Object.assign(result, typeRecord);

    // Create other resources
    await Promise.all(
        resources.map(async (resource) => {
            const media_resource = `media_${resource.slice(0, -1)}`;
            const response = await createResources(body[`${resource}Body`] ?? {}, result.media.id, resource, media_resource);
            await setInResultIfNotEmpty(result, resource, response[resource], resultMutex);
            await setInResultIfNotEmpty(result, media_resource, response[media_resource], resultMutex);
        })
    );

    // Handle seasons
    if (body.seasonsBody?.seasons?.length > 0) {
        const seasonService = new Service<Tables<'season'>>('season');
        const seasonMutex = new Mutex();
        await Promise.all(
            body.seasonsBody.seasons.map(async (season: any) => {
                const seasonRecord = await seasonService.create({ body: { [`${mediaType}_id`]: result.id, ...season } });
                await addToList(result.seasons, seasonRecord, seasonMutex);
            })
        );
    }
    removeIfEmpty(result, 'seasons');

    // Handle series
    if (body.seriesBody?.series_name?.length > 0) {
        const seriesService = new Service<Tables<'series'>>('series');
        const seriesList: any[] = [];
        const seriesMutex = new Mutex();
        await Promise.all(
            body.seriesBody.series_name.map(async (entry: any) => {
                if (!entry) return;

                const attributes = createAttributes('series', entry);
                let record;
                try {
                    record = await seriesService.read({ single: true, filters: { name: attributes.name } });
                } catch {
                    record = await seriesService.create({ body: attributes });
                    await addToList(result.series, record, resultMutex);
                }
                await addToList(seriesList, record, seriesMutex);
            })
        );
        removeIfEmpty(result, 'series');
    }

    removeIfEmpty(result, 'related_medias');
    removeIfEmpty(result, `related_${mediaTypePlural}`);
    removeIfEmpty(result, 'media_series');

    return result;
};
