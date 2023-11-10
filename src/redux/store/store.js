import {configureStore} from '@reduxjs/toolkit';
import productReducer from  '../ReminderReducer/ReminderReducer'
export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});