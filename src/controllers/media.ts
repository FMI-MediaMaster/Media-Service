import { Request, Response } from 'express';
import MediaService from '../services/media';
import { BookSchema, MovieSchema, AnimeSchema } from '@schemas/media';
import { MediaType } from '../types/media';

export default class MediaController {
    private service = new MediaService();

    create = (req: Request, res: Response): Response => {
        try {
            const { type } = req.body;

            let validated;

            switch (type) {
            case MediaType.BOOK:
                validated = BookSchema.parse(req.body);
                break;

            case MediaType.MOVIE:
                validated = MovieSchema.parse(req.body);
                break;

            case MediaType.ANIME:
                validated = AnimeSchema.parse(req.body);
                break;

            default:
                return res.status(400).json({ error: 'Invalid media type' });
            }

            const created = this.service.create(validated);
            return res.status(201).json(created);

        } catch (err: unknown) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(400).json({ error: 'Unexpected error' });
        }
    };

    readAll = (req: Request, res: Response): Response => {
        return res.json(this.service.readAll());
    };

    read = (req: Request, res: Response): Response => {
        const item = this.service.readById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        return res.json(item);
    };

    update = (req: Request, res: Response): Response => {
        const updated = this.service.update(req.params.id, req.body);
        if (!updated) return res.status(404).json({ error: 'Not found' });
        return res.json(updated);
    };

    delete = (req: Request, res: Response): Response => {
        const success = this.service.delete(req.params.id);
        if (!success) return res.status(404).json({ error: 'Not found' });
        return res.status(204).send();
    };
}
