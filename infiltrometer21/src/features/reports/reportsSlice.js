import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Empty array of reports
const initialState = {
  reports: {},
  curId: "-1",
};

export const reportsSlice = createSlice({
  name: 'reports',
  initialState,
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
      // Add it to the reports
      state.reports[newReport.id] = newReport;

    },

    /** Adds a reading to the report with the provided id
     * action needs an 
     * @param id
     * @param reading
     * 
     */
    addReading: (state, action) => {
      // Add the reading to based on the reading's time and
      let _readings = state.reports[state.curId].readings;

      if (_readings.length === 0) {
        _readings.push(action.payload);
        return;
      }

      for (let i = 0; i < _readings.length; i++) {
        if (_readings[i].secondsElapsed === action.payload.secondsElapsed) {
          // Modify the elements
          _readings[i] = action.payload;
          return;
        }
      }
      _readings.push(action.payload);

      // Sort the elements
      _readings.sort((a, b) => (a.secondsElapsed > b.secondsElapsed) ? 1 : -1);
    },

    removeReadingWithTime: (state, action) => {
      // Remove the reading to based on the reading's time
      let _readings = [...state.reports[state.curId].readings];
      state.reports[state.curId].readings = [..._readings].filter(r => r.secondsElapsed !== action.payload);
    },

    // Sets the current gathering data report
    setGatheringData: (state, action) => {
      state.reports[state.curId].gatheringData = action.payload;
    },

    removeReport: (state, action) => {
      // Remove the report with the id provided in action.payload
      delete state.reports[action.payload];

      // If the current report is the one we are trying to delete, set a new current id
      if (state.curId === action.payload) {
        state.curId = Object.keys(state.reports)[0];
      }
    },

    setCurId: (state, action) => {
      state.curId = action.payload;
    },

    setNotes: (state, action) => {
      state.reports[state.curId].notes = action.payload;
    },

    // Sets the current report's infiltrometer data
    setCurInfiltrometerData: (state, action) => {

      state.reports[state.curId].infiltrometerData = action.payload;
    }
  }
});

export const { newReport, addReading, removeReadingWithTime, setGatheringData, removeReport, setCurId, setNotes, setCurInfiltrometerData } = reportsSlice.actions;
export const selectReports = (state) => state.reports.reports;
export const selectCurId = (state) => state.reports.curId;
export const selectNotes = (state) => state.reports.reports[state.reports.curId].notes;
export const selectCurReadingID = (state) => state.reports.reports[state.reports.curId].readings.length - 1;
export const selectGatheringData = (state) => {
  if (state.reports.reports[state.reports.curId] === undefined) return undefined;
  else return state.reports.reports[state.reports.curId].gatheringData;
}
export default reportsSlice.reducer;