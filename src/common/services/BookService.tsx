import { Book, Category } from "../interfaces/Book.interface";
import { BooksCategories } from "../interfaces/BookCategories.interface";
import { APIS } from "../constants/API_Config";


let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token,
};

export const getAllBooks: () => Promise<BooksCategories> = () =>
  fetch(`${APIS.GET_ALL_BOOKS}`, { headers })
    .then((res) => res.json())
    .then((res) => res.books)
    .then((booksResponse: any) => {
      const booksPerCategory: BooksCategories = {
        currentlyReading: [],
        wantToRead: [],
        read: [],
        none: []
      };
      for (const book of booksResponse) {
        const category: Category = book.shelf;
        booksPerCategory[category].push({
          id: book.id,
          title: book.title,
          subtitle: book.subtitle,
          authors: book.authors,
          image: book.imageLinks.thumbnail,
          category,
          mainCategory: category,
          industryIdentifiers: book.industryIdentifiers?.map((industryIdentifier: { type: string, identifier: string }) => industryIdentifier.identifier)
        });
      }
      return booksPerCategory;
    });

export const searchForBooks: (query: string, maxResults: number) => Promise<Book[]> = (query: string, maxResults: number) =>
  fetch(`${APIS.SEARCH_FOR_BOOKS}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, maxResults }),
  })
    .then((res) => res.json())
    .then((res) => res.books)
    .then((booksResponse: any) => {
      const books: Book[] = [];

      if (!booksResponse.error) {
        for (const book of booksResponse) {
          const category: Category = book.shelf ? book.shelf : 'none';
          books.push({
            id: book.id,
            title: book.title,
            subtitle: book.subtitle,
            authors: book.authors ? book.authors : [],
            image: book.imageLinks?.thumbnail,
            category,
            mainCategory: category,
            industryIdentifiers: book.industryIdentifiers ? book.industryIdentifiers.map((industryIdentifier: { type: string, identifier: string }) => industryIdentifier.identifier) : []
          });
        }
      }

      return books;
    });

export const updateBookCategory = (bookId: string, category: string) =>
  fetch(`${APIS.UPDATE_BOOK.replace('{bookId}', bookId)}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category }),
  }).then((res) => res.json());