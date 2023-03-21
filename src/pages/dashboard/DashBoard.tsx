import { FC } from 'react';
import { BooksCategories } from '../../common/interfaces/BookCategories.interface';
import BookCategory from '../../common/components/book-category/BookCategory';
import Spinner from '../../common/components/spinner/Spinner';
import classes from './DashBoard.module.css';
import { Link } from "react-router-dom";
const DashBoard: FC<{
  booksPerCategory: BooksCategories
}> = (props: {
  booksPerCategory: BooksCategories,
}) => {

  return (
    <>
      <div className={classes["list-books-title"]}>
        <h1>MyReads</h1>
        <Link className={classes["link"]} to="/">OverView Page</Link>
        <Link className={`${classes["link"]} ${classes["Search-link"]}`} to="/search">Search Page</Link>
      </div>
      {
        props.booksPerCategory ?
        <div className={classes["list-books-content"]}>
        <BookCategory categoryName="Currently Reading" books={props.booksPerCategory['currentlyReading']} />
        <BookCategory categoryName="Want To Read" books={props.booksPerCategory['wantToRead']} />
        <BookCategory categoryName="Read" books={props.booksPerCategory['read']} />
      </div> :  <Spinner/>
      }
       
    </>
  );
};

export default DashBoard;
