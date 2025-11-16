import { Router, Request, Response } from 'express';
import { InMemoryManager } from './manager';

export interface RouterOptions {
    resource: string;
    discardInCreate?: string[];
    validateInCreate?: string[];
    populateInCreate?: Record<string, unknown>;
    discardInUpdate?: string[];
    noDelete?: boolean;
}

export function createDefaultRouter<T extends { id?: string }>(
    options: RouterOptions
): Router {
    const router = Router();
    const manager = new InMemoryManager<T>(options.resource);

    const discard = (obj: Record<string, unknown>, fields: string[]) => {
        fields.forEach(f => delete obj[f]);
    };

    const validate = (obj: Record<string, unknown>, fields: string[]) => {
        const missing = fields.filter(f => obj[f] === undefined);
        if (missing.length > 0) throw new Error(`Missing fields: ${missing.join(', ')}`);
    };

    const populate = (
        obj: Record<string, unknown>,
        defaults: Record<string, unknown>
    ) => {
        for (const [key, value] of Object.entries(defaults)) {
            if (obj[key] === undefined) obj[key] = value;
        }
    };

    router.get('/', (_req: Request, res: Response) => {
        return res.json(manager.readAll());
    });

    router.get('/:id', (req: Request, res: Response) => {
        const item = manager.readById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        return res.json(item);
    });

    router.post('/', (req: Request, res: Response) => {
        try {
            const body = { ...req.body } as Record<string, unknown>;

            discard(body, options.discardInCreate ?? []);
            validate(body, options.validateInCreate ?? []);
            populate(body, options.populateInCreate ?? {});

            const created = manager.create(body as Omit<T, 'id'>);
            return res.status(201).json(created);

        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Unexpected error';
            return res.status(400).json({ error: message });
        }
    });

    router.put('/:id', (req: Request, res: Response) => {
        const body = { ...req.body } as Partial<T>;
        discard(body as Record<string, unknown>, options.discardInUpdate ?? []);

        const updated = manager.update(req.params.id, body);
        if (!updated) return res.status(404).json({ error: 'Not found' });
        return res.json(updated);
    });

    router.delete('/:id', (req: Request, res: Response) => {
        if (options.noDelete) {
            return res.status(405).json({ error: 'Delete disabled for this resource' });
        }

        const deleted = manager.delete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Not found' });
        return res.status(204).send();
    });

    return router;
}
