import { useState, useEffect, useRef, useMemo } from 'react';
import { fetchBooks, searchBooks } from '../../redux/BookActions';
import { useSelector, useDispatch } from 'react-redux';
import { bookActions } from '../../redux/BookSlice';
import { BooksCategories } from '../../common/interfaces/BookCategories.interface';
import Search from './Search';
import debounce from 'lodash.debounce';

const SearchContainer = () => {

    const [searching, setSearchingFlag] = useState<boolean>(false);

    const [searchValue, setSearchValue] = useState<string>('');

    const dispatch = useDispatch();

    const booksForQuery = useSelector((state: any) => state.books.booksForQuery);

    const allBooksPerCategory: BooksCategories = useSelector((state: any) => state.books.allBooksPerCategory);

    const changeFilterValue = (event: any) => {

        setSearchingFlag(true);

        // clearTimeout(timeout.current);

        // timeout.current = setTimeout(() => {

        const userInput = event.target.value ? event.target.value.trim().toLowerCase() : '';

        if (searchValue !== userInput) {

            setSearchValue(userInput);

            if (userInput) {

                dispatch(searchBooks(userInput) as any);
            } else {

                dispatch(bookActions.searchForBooks({
                    booksForQuery: null,
                }));
            }
        } else {
            setSearchingFlag(false);
        }
        // }, 500);
    };

    const debouncedResults = useMemo(() => {
        return debounce(changeFilterValue, 500);
    // TODO: changeFilterValue is a missing dependency of this effect
    }, []);

    // TODO: useEffect should be used only for side effects. You can use useMemo instead if you want to return a value
    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    useEffect(() => {
        if (!allBooksPerCategory) {
            dispatch(fetchBooks() as any);
        }
    }, [dispatch, allBooksPerCategory]);

    useEffect(() => {
        setSearchingFlag(false);
    }, [booksForQuery]);

    return (
        <>
            {
                <Search isLoading={!allBooksPerCategory || !searching} changeFilterValue={debouncedResults}
                    books={booksForQuery} />
            }
        </>
    )
};

export default SearchContainer;
