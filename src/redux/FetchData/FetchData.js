// import {createAsyncThunk} from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const FetchData = createAsyncThunk('fetchProducts', async () => {
// //   const res = await fetch('https://fakestoreapi.com/products');
//   const res = await AsyncStorage.getItem('ReminderData');
//   const final = await res.json();
//   return final;
// });

import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FetchData = createAsyncThunk('fetchProducts', async () => {
  try {
    const data = await AsyncStorage.getItem('ReminderData');
    // Check if data exists
    if (data !== null) {
      // Data retrieval successful, return the parsed data
      return JSON.parse(data);
    } else {
      // Handle case when no data is found
      return []; // or any default value as needed
    }
  } catch (error) {
    // Handle errors, you might want to dispatch an error action here
    throw error;
  }
});
