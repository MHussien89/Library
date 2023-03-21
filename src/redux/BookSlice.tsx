import { createSlice } from '@reduxjs/toolkit';
import { Book, Category } from '../common/interfaces/Book.interface';
import { BooksCategories } from '../common/interfaces/BookCategories.interface';

export interface State {
  allBooksPerCategory: BooksCategories | null,
  categoryChanges: Object | null,
  booksForQuery: Book[] | null
}

const bookSlice = createSlice({
  name: 'book',
  initialState: {
    allBooksPerCategory: null,
    categoryChanges: null,
    booksForQuery: null
  },
  reducers: {
    setBooks(state: State, action) {

      state.allBooksPerCategory = action.payload.allBooksPerCategory;
    },
    searchForBooks(state: State, action) {

      if (Array.isArray(action.payload.booksForQuery) && action.payload.booksForQuery.length) {

        const booksIdsPerIndex: {
          [bookId: string]: number
        } = action.payload.booksForQuery.reduce((a:{[bookId: string]: number}, book: Book, currentIndex: number) => 
        ({ ...a, [book.id]: currentIndex}), {});
  
        if(state.allBooksPerCategory) {
  
          for(const category in state.allBooksPerCategory) {
  
            const booksInCategory: Book[] = state.allBooksPerCategory[category as 'currentlyReading' | 'wantToRead' | 'read'];
  
            for (const book of booksInCategory) {
  
              if (typeof booksIdsPerIndex[(book as Book).id] !== 'undefined') {
  
                action.payload.booksForQuery[booksIdsPerIndex[(book as Book).id]].category = book.category;
              }
            }
          }
        }
      }

      state.booksForQuery = action.payload.booksForQuery;
    },
    changeCategory(state: State, action: any) {

      const currentCategory: 'currentlyReading' | 'wantToRead' | 'read' | 'none' = action.payload.currentCategory;

      const newCategory: Category = action.payload.newCategory;

      if (state.allBooksPerCategory) {

        if (currentCategory !== 'none' && state.allBooksPerCategory[currentCategory]) {

          let bookIndexInOverview: number  = state.allBooksPerCategory[currentCategory].findIndex((book: Book) => book.id === action.payload.bookId);

            const modifiedBook: Book = {
              ...state.allBooksPerCategory[currentCategory][bookIndexInOverview],
              category: newCategory
            };

            state.allBooksPerCategory[currentCategory].splice(bookIndexInOverview, 1);
  
            if (newCategory !== 'none') {

              state.allBooksPerCategory[newCategory].push(modifiedBook);
          }
        }
      }

      if (Array.isArray(state.booksForQuery)) {

        let bookIndexInSearch: number = state.booksForQuery.findIndex((book: Book) => book.id === action.payload.bookId);

        if (bookIndexInSearch >= 0) {

          const modifiedBook: Book = {
            ...state.booksForQuery[bookIndexInSearch],
            category: newCategory
          }
  
          state.booksForQuery[bookIndexInSearch] = modifiedBook;

          if(currentCategory === 'none' && newCategory !== 'none' && state.allBooksPerCategory) {

            state.allBooksPerCategory[newCategory].push(state.booksForQuery[bookIndexInSearch]);
          }
        }
      }
    }
  },
});

export const bookActions = bookSlice.actions;

export default bookSlice;
