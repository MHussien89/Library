import Book from '../book/Book';
import { Book as BookInterface } from '../../interfaces/Book.interface';
import classes from './BookCategory.module.css';

const BookCategory = (props: {
  categoryName: string,
  books: BookInterface[]
}) => {

  return (
    <div className={classes.bookcategory}>
      <h2 className={classes["bookcategory-title"]}>{props.categoryName}</h2>
      <div className={classes["bookcategory-books"]}>
        <ol className={classes["books-grid"]}>
          {
            (Array.isArray(props.books) && props.books.length) ? (props.books.map((book: BookInterface) => {
              return <Book key={book.id} book={book} />
            })) : (<h1 style={{color: '#2e7c31'}}> No Books For This Category</h1>)
          }
        </ol>
      </div>
    </div>
  );
};

export default BookCategory;
