import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {TimerStateValues} from 'react-compound-timer'
const initialState = {};

export const baerReplicationSlice = createSlice({
    name: 'baerReplication',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {}
});
export default baerReplicationSlice.reducer;