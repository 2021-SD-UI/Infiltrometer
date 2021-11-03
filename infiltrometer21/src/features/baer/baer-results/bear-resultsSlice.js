import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {baerInitializeSlice} from "../baer-initialize/bear-initializeSlice";



const initialState = {
    notes: "hi im a note"
};

export const baerResultsSlice = createSlice({
    name: 'baerResults',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

      setNotes: (state, action)=>{

          state.notes = action.payload;
          console.log(state.notes);
      }





  }
});
export const selectNotes = (state) => state.baerResults.notes;
export const {setNotes} = baerResultsSlice.actions;
export default baerResultsSlice.reducer;