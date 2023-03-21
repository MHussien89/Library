export interface Book {
    id: string;
    title: string;
    subtitle: string;
    authors: string[];
    image: string;
    category: Category;
    mainCategory?: Category;
    industryIdentifiers: string[];
}

export enum Category {
    CURRENTLY_READING = 'currentlyReading',
    WANT_TO_READ = 'wantToRead',
    READ = 'read',
    NONE = 'none'
}