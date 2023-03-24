import { FC } from 'react';
import { BooksCategories } from '../../common/interfaces/BookCategories.interface';
import BookCategory from '../../common/components/book-category/BookCategory';
import Spinner from '../../common/components/spinner/Spinner';
import classes from './DashBoard.module.css';
import { Link } from "react-router-dom";

// TODO: please not use FC as it cosidered a bad practice check this link https://github.com/UnlyEd/next-right-now/issues/303
const DashBoard: FC<{
  booksPerCategory: BooksCategories
}> = (props: {
  booksPerCategory: BooksCategories,
}) => {
  // TODO: you can use object props destructuring here
  // const { booksPerCategory } = props;
  return (
    <>
      <div className={classes["list-books-title"]}>
        <h1>MyReads</h1>
        {/* you can access property link from classes with . directly */}
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
