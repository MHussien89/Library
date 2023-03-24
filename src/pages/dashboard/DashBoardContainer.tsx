import { BooksCategories } from '../../common/interfaces/BookCategories.interface';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { bookActions } from '../../redux/BookSlice';
import { fetchBooks } from '../../redux/BookActions';
import DashBoard from './DashBoard';

const DashBoardContainer = () => {

  const dispatch = useDispatch();
  // TODO: replace any and add the correct type
  const allBooksPerCategory: BooksCategories = useSelector((state: any) => state.books.allBooksPerCategory);

  useEffect(() => {
    dispatch(bookActions.searchForBooks({
      booksForQuery: null,
    }));
  }, [dispatch]);

  useEffect(() => {
    if (!allBooksPerCategory) {
      // TODO: replace any and add the correct type
      dispatch(fetchBooks() as any);
    }
  }, [dispatch, allBooksPerCategory]);

  // TODO: return the component Directly without using fragment or you can use fragment if you have more than one component
  return (
    <>
      <DashBoard booksPerCategory={allBooksPerCategory} />

    </>
  );
};

export default DashBoardContainer;
