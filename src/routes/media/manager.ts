import { randomUUID } from 'crypto';

export class InMemoryManager<T extends { id?: string }> {
    private store: T[] = [];
    private resource: string;

    constructor(resource: string) {
        this.resource = resource;
    }

    create(data: Omit<T, "id">): T {
        const entry = { id: randomUUID(), ...data } as T;
        this.store.push(entry);
        return entry;
    }

    readAll(): T[] {
        return this.store;
    }

    readById(id: string): T | undefined {
        return this.store.find(item => item.id === id);
    }

    update(id: string, data: Partial<T>): T | null {
        const index = this.store.findIndex(item => item.id === id);
        if (index === -1) return null;
        this.store[index] = { ...this.store[index], ...data };
        return this.store[index];
    }

    delete(id: string): boolean {
        const before = this.store.length;
        this.store = this.store.filter(item => item.id !== id);
        return this.store.length !== before;
    }
}
