import { Book } from "./Book.interface";

export interface BooksCategories {
    currentlyReading: Book[],
    wantToRead: Book[],
    read: Book[],
    none: Book[]
}
