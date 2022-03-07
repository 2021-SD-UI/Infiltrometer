import { createSlice } from '@reduxjs/toolkit';

// This is the initial page that should be loaded
const initialState = {
  page: '/'
};

export const redirectSlice = createSlice({
  name: 'redirector',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    }
  }
});

export const { setPage } = redirectSlice.actions;
export const selectPage = (state) => state.redirector.page;
export default redirectSlice.reducer;