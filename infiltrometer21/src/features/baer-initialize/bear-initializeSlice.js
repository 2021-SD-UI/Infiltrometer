import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';





const initialState = {
  infiltrometerType: 0,
  infiltrometerR: 0, // radius in cm, positive float
  suction:-1,  // negative number, units cm

  // Soil data, need either 
  soilType: { 
    nh0: 0,
    alpha: 0
  }
};



/**
 * We need slices to 
 */
export const baerInitializeSlice = createSlice({
    name: 'baerInitialize',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  }
});

/**
 * A selector returning the current type of the infiltrometer
 * @param {*} state 
 * @returns 
 */
export const selectInfiltrometerType = (state) => state.infiltrometerType;

export const selectInfiltrometerRadius = (state) => state.infiltrometerR;

export const selectInfiltrometerSuction = (state) => state.suction;


export default baerInitializeSlice.reducer;