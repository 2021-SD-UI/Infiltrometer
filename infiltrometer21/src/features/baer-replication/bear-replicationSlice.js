import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {TimerStateValues} from 'react-compound-timer'


/**
 * Initialize all the data associated with a reading....
 * Dispatch the addReading action from the reportsSlice after validating the reading
 */
const initialState = {
  


};

export const baerReplicationSlice = createSlice({
    name: 'baerReplication',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {}
});





export default baerReplicationSlice.reducer;