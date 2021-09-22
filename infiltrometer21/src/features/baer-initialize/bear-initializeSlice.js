import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { soilTypes } from '../../app/soilTypes';

 const initialState = {  
        initialVolume: 0,
        
        coordinates: {
          lat:0,
          long: 0,
        },

        soilType: soilTypes.default,
        
        infiltrometerRadius: 0,
        
        timeInterval: 30

};



/**
 * We need slices to 
 */
export const baerInitializeSlice = createSlice({
    name: 'baerInitialize',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    //Update the appropritate values to the provided infiltrometer type  
    
    setInfiltrometerType: (state, action) => {
      
      switch (action.payload.infiltrometerType){
        default:
          //set the radius to 0
          state.infiltrometerR = 0;
          break;

      }
    },
    setInitialVolume: (state, action)=>{

      state.initialVolume = action.payload.initialVolume;
    
    }

  }
});

/**
 * A selector returning the current type of the infiltrometer
 * @param {*} state 
 * @returns 
 */
export const selectInfiltrometerType = (state) => state.bearInitialize.infiltrometerType;

export const selectInfiltrometerRadius = (state) => state.bearInitialize.infiltrometerR;

export const selectInfiltrometerSuction = (state) => state.bearInitialize.suction;

export const selectSoilType = (state) => state.bearInitialize.soilType;

export const selectInitialVolume = (state) => state.bearInitialize.initialVolume;

export const selectInfiltrometerData = (state) => state.bearInitialize;



export default baerInitializeSlice.reducer;