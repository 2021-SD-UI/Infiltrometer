import { createSlice } from '@reduxjs/toolkit';
import { Pages } from './Redirector';




//This is the initial page that should be loaded
const initialState = {
  page: Pages.Homepage
};

export const redirectSlice = createSlice({
  name: 'redirector',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    }
  }
});

export const { setPage } = redirectSlice.actions;
export const selectPage = (state) => state.redirector.page;

export default redirectSlice.reducer;