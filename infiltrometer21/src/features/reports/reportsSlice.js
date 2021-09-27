import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';




//empty array of reports
const initialState = {
    reports:[],
    curId: -1
};

export const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
     newReport: (state, action) => {
      // Push a new report onto the report stack and increment the id
      state.curId++;
      state.reports = [...state.reports,(
        {
            id: state.curId,
            date: action.payload.date,
            protocol: action.payload.protocol,
            readings: [],
            infiltrometerData: action.payload.infiltrometerData
        }
      )];

    },

    /** Adds a reading to the report with the provided id
     * action needs an 
     * @param id
     * @param reading
     * 
     */
    addReading: (state, action)=>{
      //add the reading to the end of the list of readings
        state.reports[state.curId].readings =
        [...state.reports[state.curId].readings, 
        action.payload]; 
    }
  }
});

export const { newReport, addReading } = reportsSlice.actions;
export const selectReports = (state) => state.reports.reports;
export const selectCurId = (state) => state.reports.curId;
export default reportsSlice.reducer;