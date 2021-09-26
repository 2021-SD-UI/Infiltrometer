import { createSlice } from '@reduxjs/toolkit';




//empty array of reports
const initialState = {
    page: null
};

export const redirectSlice = createSlice({
  name: 'redirector',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
     setPage: (state, action) => {
      state.page = action.payload;
    }}
});

export const {setPage} = redirectSlice.actions;
export const selectPage = (state) => state.redirector.page;

export default redirectSlice.reducer;