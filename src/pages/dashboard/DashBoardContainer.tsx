import { BooksCategories } from '../../common/interfaces/BookCategories.interface';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { bookActions } from '../../redux/BookSlice';
import { fetchBooks } from '../../redux/BookActions';
import DashBoard from './DashBoard';

const DashBoardContainer = () => {

  const dispatch = useDispatch();

  const allBooksPerCategory: BooksCategories = useSelector((state: any) => state.books.allBooksPerCategory);

  useEffect(() => {
    dispatch(bookActions.searchForBooks({
      booksForQuery: null,
    }));
  }, [dispatch]);

  useEffect(() => {
    if (!allBooksPerCategory) {
      dispatch(fetchBooks() as any);
    }
  }, [dispatch, allBooksPerCategory]);

  return (
    <>
      <DashBoard booksPerCategory={allBooksPerCategory} />

    </>
  );
};

export default DashBoardContainer;
