import supabase from '@utils/supabase';
import errors from '@media-master/http-errors';
import { TableName } from '@types';

export default class Service<T> {
    private resource: string;

    constructor(resource: string) {
        this.resource = resource;
    };

    private get table() {
        return supabase.from(this.resource);
    };

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    private addFilters(query: any, filters: Record<string, unknown>) {
        for (const [key, value] of Object.entries(filters)) {
            if (key === 'name') {
                query = query.ilike(key, value);
            } else if (Array.isArray(value)){
                query = query.in(key, value);
            } else {
                query = query.eq(key, value);
            }
        }
    };

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    private async solveQuery(query: any) {
        const { data, error, status } = await query;
        if (error) throw errors.http(status, error.message);
        return data;
    };

    async handleDependencies({
        tableToIdMap,
        id,
    }: {
        tableToIdMap: Partial<Record<TableName, string>>;
        id: string;
    }): Promise<void> {
        const entries = Object.entries(tableToIdMap) as [TableName, string][];
        await entries.reduce(
            (prevPromise, [table, idField]) =>
                prevPromise.then(() =>
                    this.solveQuery(
                        supabase
                            .from(table)
                            .delete()
                            .eq(idField, id)
                    )
                ),
            Promise.resolve()
        );
    };

    async read({
        single = false,
        filters = {},
    }: {
        single?: boolean;
        filters?: Record<string, unknown>;
    }): Promise<T | T[]> {
        const query = this.table.select('*');
        this.addFilters(query, filters);
        if (single) {
            const data = await this.solveQuery(query.maybeSingle());
            if (!data) throw errors.badRequest(`Invalid ${Object.keys(filters)[0] || 'request'}`);
            return data;
        }
        
        const allData: T[] = [];
        const limit = 1000;
        let offset = 0;

        while (true) {
            const data = await this.solveQuery(query.range(offset, offset + limit - 1));
            if (!data || data.length === 0) break;

            allData.push(...data);
            if (data.length < limit) break;
            offset += limit;
        }
        return allData;
    }

    async create({
        body
    }: {
        body: T
    }): Promise<T> {
        const query = this.table.insert(body).select('*');
        return await this.solveQuery(query.single());
    };

    async update({
        body,
        filters
    }: {
        body: T,
        filters: Record<string, unknown>
    }): Promise<T> {
        const query = this.table.update(body).select('*');
        this.addFilters(query, filters);
        const data = await this.solveQuery(query.single());
        if (!data) throw errors.badRequest(`Invalid ${Object.keys(filters)[0] || 'request'}`);
        return data;
    };

    async delete({
        filters = {}
    }: {
        filters: Record<string, unknown>
    }): Promise<void> {
        if (Object.keys(filters).length > 0) {
            const query = this.table.delete();
            this.addFilters(query, filters);
            return await this.solveQuery(query.maybeSingle());

            // query without .single() returns null for both valid and invalid cases, so we get 204 in both cases
            // adding .single() and querying an invalid id gives error 406 with the message 'The result contains 0 rows'
            // decide later if we change the current one
        }
    };
}
