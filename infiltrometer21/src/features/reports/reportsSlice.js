import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';



//empty array of reports
const initialState = {
    reports:{},
    curId: "-1"
    
};

export const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
     newReport: (state, action) => {
      // Push a new report onto the report stack and increment the id
      state.curId = uuidv4();
      
      let newReport = 
        {
            id: state.curId,
            date: action.payload.date,
            protocol: action.payload.protocol,
            readings: [],
            infiltrometerData: action.payload.infiltrometerData,
            gatheringData: true,
        }
      //add it to the reports
      state.reports[newReport.id] = newReport; 

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
    },
    //sets the current gathering data report
    setGatheringData: (state, action)=>{
      state.reports[state.curId].gatheringData = action.payload;
    }
  }
});

export const { newReport, addReading, setGatheringData } = reportsSlice.actions;
export const selectReports = (state) => state.reports.reports;
export const selectCurId = (state) => state.reports.curId;
export const selectCurReadingID = (state) => state.reports.reports[state.reports.curId].readings.length - 1;
export const selectGatheringData = (state) => state.reports.reports[state.reports.curId].gatheringData;
export default reportsSlice.reducer;