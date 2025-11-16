export enum MediaType {
    BOOK = 'book',
    MOVIE = 'movie',
    ANIME = 'anime'
}

export interface BaseMedia {
    id: string;
    type: MediaType;
    title: string;
}
