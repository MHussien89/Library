import { bookActions } from './BookSlice';
import { getAllBooks, searchForBooks, updateBookCategory } from '../common/services/BookService';
// TODO: remove this unused import
import useSWR from "swr";

export const fetchBooks = () => {
  return async (dispatch: any) => {
    const fetchData = async () => {
      // getAllBooks_1();
      // TODO: remove unused variable response and return the result of getAllBooks directly
      const response = await getAllBooks();
      return response;
    };

    try {
      // TODO: I think no need to fetchData() here you can directly call getAllBooks() here
      const booksPerCategory = await fetchData();
      dispatch(
        bookActions.setBooks({
          allBooksPerCategory: booksPerCategory || [],
        }));
    } catch (error) {
      // TODO: display error message
      // alert('Searching books failed');
    }
  };
};

export const searchBooks = (query: string) => {

  return async (dispatch: any) => {
    const searchForABook = async () => {
      const response = await searchForBooks(query, 10);
      return response;
    };

    try {
      const booksForQuery = await searchForABook();

      dispatch(
        bookActions.searchForBooks({
          booksForQuery: booksForQuery || [],
        }));
    } catch (error) {
      // TODO: display error message
      // alert('Loading books failed');
    }
  };
};

export const updateBook = (bookId: string, newCategory: string, currentCategory: string) => {
  return async (dispatch: any) => {
    const updateABook = async () => {
      const response = await updateBookCategory(bookId, newCategory);
      return response;
    };

    try {
      await updateABook();
      dispatch(
        // TODO: remove this any cast
        bookActions.changeCategory({
          bookId: bookId,
          newCategory: newCategory,
          currentCategory: currentCategory
        } as any)
      );
    } catch (error) {
      // TODO: display error message
      // alert('Updating book failed');
    }
  };
};
