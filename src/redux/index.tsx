import { configureStore } from '@reduxjs/toolkit';
import bookSlice from './BookSlice';

const store = configureStore({
  reducer: { books: bookSlice.reducer },
});

export default store;
