import { createDefaultRouter } from './router-default';

export type Book = {
    id?: string;
    title: string;
    author: string;
    pages: number;
};

export const bookRouter = createDefaultRouter<Book>({
    resource: 'book',
    discardInCreate: ['id'],
    validateInCreate: ['title', 'author', 'pages'],
});
