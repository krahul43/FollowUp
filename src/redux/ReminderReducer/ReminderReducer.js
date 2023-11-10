import { FetchData } from '../FetchData/FetchData';

const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

const ReminderReducer = createSlice({
  name: 'products',
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
  },
  extraReducers: builder => {
    builder.addCase(FetchData.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(FetchData.fulfilled, (state, action) => {
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(FetchData.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

export default ReminderReducer.reducer;