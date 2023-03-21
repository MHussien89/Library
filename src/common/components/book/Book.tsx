import { Book as BookInterface, Category } from '../../interfaces/Book.interface';
import DropDown from '../dropdown/DropDown';
import classes from './Book.module.css';
import { useDispatch } from 'react-redux';
import { updateBook } from '../../../redux/BookActions';

const Book = (props: {
  book: BookInterface
}) => {
  const dispatch = useDispatch();

  const handleCategoryChange = (event: any) => {

    const newCategory: Category = event.target.value;

    const currentCategory: Category = props.book.category;

    dispatch(updateBook(props.book.id, newCategory, currentCategory) as any);
  };
  return (
    <li>
      <div className={classes["book"]}>
        <div className={classes["book-top"]}>
          <div
            className={classes["book-cover"]}
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                `url(${props.book['image']})`,
            }}
          ></div>
          <DropDown bookId={props.book.id} currentCategory={props.book.category} handleCategoryChange={handleCategoryChange} />
        </div>
        <div className={classes["book-title"]}>{props.book['title']}</div>
        <div className={classes["book-authors"]}>{props.book['authors'].join(',')}</div>
      </div>
    </li>
  );
};

export default Book;
