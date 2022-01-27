import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    notes: "hi im a note"
};

export const standardResultsSlice = createSlice({
    name: 'standardResults',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {

        setNotes: (state, action) => {

            state.notes = action.payload;
            console.log(state.notes);
        }





    }
});
export default standardResultsSlice.reducer;