import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


/**
 * Initialize all the data associated with a reading....
 * Dispatch the addReading action from the reportsSlice after validating the reading
 */
const initialState = {
  volume: 0,
  secondsElapsed: 0
};

export const baerReplicationSlice = createSlice({
    name: 'baerReplication',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    /**
     *Sets the current volume in the reading 
     * @param {the current state} state 
     * @param {must contain a volume payload} action 
     */
    setVolume: (state, action)=>{
      state.volume = Number(action.payload);
    }
    ,
    setSecondsElapsed: (state, action)=>{
      state.secondsElapsed = Number(action.payload);
    }

  }
});

export const {setVolume, setSecondsElapsed} = baerReplicationSlice.actions;


export const selectReading = (state) => state.baerReplication;

export default baerReplicationSlice.reducer;