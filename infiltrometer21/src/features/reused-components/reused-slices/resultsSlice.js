import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notes: "hi im a note"
};

export const ResultsSlice = createSlice({
    name: 'baerResults',
    initialState,
    reducers: {
        setNotes: (state, action) => {
            state.notes = action.payload;
            console.log(state.notes);
        }
    }
});

export default ResultsSlice.reducer;