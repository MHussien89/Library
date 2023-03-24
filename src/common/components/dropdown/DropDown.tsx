import classes from './DropDown.module.css';
import React from 'react';
import { Category } from '../../interfaces/Book.interface';

const DropDown = (props: {
  currentCategory?: Category,
  bookId: string,
  handleCategoryChange?: React.ChangeEventHandler<HTMLSelectElement>
}) => {

  const categories = [{
    text: 'Currently Reading',
    value: 'currentlyReading'
  },
  {
    text: 'Want to Read',
    value: 'wantToRead'
  },
  {
    text: 'Read',
    value: 'read'
  }];

  return (
    <div className={classes["book-category-changer"]}>
      <select data-testid="category-dropdown" value={props.currentCategory} onChange={props.handleCategoryChange} >
        <option value="none" disabled>
          Move to...
        </option>
        {
          // TODO: please use implicit return
          categories.map((category) => {
            return <option key={category.value} value={category.value}>
              {category.text}
            </option>
          })
        }
      </select>
    </div>
  );
};

export default DropDown;
