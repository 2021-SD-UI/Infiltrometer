import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';




//empty array of reports
const initialState = {
    reports:[],
    curId: 0
};

export const reportsSlice = createSlice({
  name: 'baerResults',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
     newReport: (state, action) => {
      // Push a new report onto the report stack and increment the id
      state.reports.push(
        {
            id: state.curId++,
            date: action.payload.date,
            protocol: action.payload.protocol,
            readings: [],
            infiltrometerType: action.payload.infiltrometerType
        }
      );

    },
    addReading: (state, action)=>{
        state.reports[action.payload.id].readings.push(action.payload.reading); 
    }
  }
});

export const { newReport } = reportsSlice.actions;
export const selectReports = (state) => state.reports;

export default reportsSlice.reducer;