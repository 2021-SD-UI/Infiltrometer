import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';



//empty array of reports
const initialState = {
  reports: {},
  curId: "-1",

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
        notes: "",
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
    addReading: (state, action) => {
      //add the reading to the end of the list of readings
      state.reports[state.curId].readings =
        [...state.reports[state.curId].readings,
        action.payload];

    },
    //sets the current gathering data report
    setGatheringData: (state, action) => {
      state.reports[state.curId].gatheringData = action.payload;
    },
    removeReport: (state, action) => {


      //remove the report with the id provided in action.payload
      delete state.reports[action.payload];

      //if the current report is the one we are trying to delete, set a new current id
      if (state.curId == action.payload) {
        state.curId = Object.keys(state.reports)[0];
      }



    },
    setCurId: (state, action) => {
      state.curId = action.payload;
    },
    setNotes: (state, action) => {
      state.reports[state.curId].notes = action.payload;
    },
    //sets the current report's infiltrometer Data
    setCurInfiltrometerData: (state, action) => {
      state.reports[state.curId].infiltrometerData = action.payload;
    }
  }
});

export const { newReport, addReading, setGatheringData, removeReport, setCurId, setNotes, setCurInfiltrometerData } = reportsSlice.actions;
export const selectReports = (state) => state.reports.reports;
export const selectCurId = (state) => state.reports.curId;
export const selectNotes = (state) => state.reports.reports[state.reports.curId].notes;
export const selectCurReadingID = (state) => state.reports.reports[state.reports.curId].readings.length - 1;
export const selectGatheringData = (state) => {
  if (state.reports.reports[state.reports.curId] === undefined) return undefined;
  else return state.reports.reports[state.reports.curId].gatheringData;
}
export default reportsSlice.reducer;