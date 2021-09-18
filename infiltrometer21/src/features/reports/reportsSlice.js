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
     newReport: (state, protocol, infiltrometerType) => {
      // Push a new report onto the report stack and increment the id
      state.reports.push(
        {
            id: state.curId++,
            date: new Date(),
            protocol: protocol,
            readings: [],
            infiltrometerType: infiltrometerType
        }
      );

    },
    addReading: (state, reading, id)=>{
        state.reports[id].readings.push(reading); 
    }
  }
});
export default reportsSlice.reducer;