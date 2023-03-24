import { FC } from 'react';
import { Book as BookInterface } from '../../common/interfaces/Book.interface';
import Book from '../../common/components/book/Book';
import classes from './Search.module.css';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../common/components/spinner/Spinner';
import React from 'react';

const Search: FC<{
  isLoading: boolean,
  changeFilterValue: React.ChangeEventHandler<HTMLInputElement>;
  books: BookInterface[] | null
}> = (props: {
  isLoading: boolean,
  changeFilterValue: React.ChangeEventHandler<HTMLInputElement>;
  books: BookInterface[] | null
}) => {

  const navigate = useNavigate();

  const goToOverview = () => navigate('/');

  return (
    <>
      <div >
        <div className={classes["search-books-bar"]}>
          {/* TODO: please use Link component from react-router-dom */}
          <a
            className={classes["close-search"]}
            onClick={goToOverview}
            href="/#"
          >
            Close
          </a>
          <div className={classes["search-books-input-wrapper"]}>
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              onChange={props.changeFilterValue}
            />
          </div>
        </div>

        <div id="search-testing-area" >
        {
          props.isLoading ?
            <div className={classes["search-books-results"]}>
              <ol className={classes["books-grid"]}>
                {
                  (Array.isArray(props.books) && props.books.length) ? (props.books.map((book: BookInterface) => {
                    return <Book key={book.id} book={book} />
                  })) : (<h1 style={{ color: '#2e7c31' }}>No Results For The Current Query</h1>)
                }
              </ol>
            </div> : <Spinner />
        }
        </div>
      </div>
    </>
  );
};

export default Search;
