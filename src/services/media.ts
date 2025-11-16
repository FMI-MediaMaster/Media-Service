import { BaseMedia } from '../types/media';
import { BookInput, MovieInput, AnimeInput } from '@schemas/media';
import { randomUUID } from 'crypto';

type MediaInput = BookInput | MovieInput | AnimeInput;
type MediaEntry = BaseMedia & MediaInput;

export default class MediaService {
    private media: MediaEntry[] = [];

    create(data: MediaInput): MediaEntry {
        const id = randomUUID();
        const entry: MediaEntry = { id, ...data };
        this.media.push(entry);
        return entry;
    }

    readAll(): MediaEntry[] {
        return this.media;
    }

    readById(id: string): MediaEntry | undefined {
        return this.media.find(m => m.id === id);
    }

    update(id: string, data: Partial<MediaInput>): MediaEntry | null {
        const index = this.media.findIndex(m => m.id === id);
        if (index === -1) return null;

        this.media[index] = { ...this.media[index], ...data };
        return this.media[index];
    }

    delete(id: string): boolean {
        const before = this.media.length;
        this.media = this.media.filter(m => m.id !== id);
        return this.media.length !== before;
    }
}
