import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { soilTypes } from '../../app/soilTypes';


 const initialState = {  
        initialVolume: 0,
        
        coordinates: {
          lat:0,
          long: 0,
        },

        soilType: soilTypes.custom,
        
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

      state.initialVolume = action.payload;
    
    },
    setInfiltrometerSuction: (state, action)=>{
      state.infiltrometerSuction = action.payload;
    },
    setTimeInterval: (state, action)=>{
      state.timeInterval = action.payload;
    },
    setSoilType:(state, action)=>{
      state.soilType = action.payload;
    }

  }
});

/**
 * A selector returning the current type of the infiltrometer
 * @param {*} state 
 * @returns 
 */
export const selectInfiltrometerType = (state) => state.baerInitialize.infiltrometerType;

export const selectInfiltrometerRadius = (state) => state.baerInitialize.infiltrometerR;

export const selectInfiltrometerSuction = (state) => state.baerInitialize.suction;

export const selectSoilType = (state) => state.baerInitialize.soilType;

export const selectInitialVolume = (state) => state.baerInitialize.initialVolume;

export const selectInfiltrometerData = (state) => state.baerInitialize;

export const selectTimeInterval = (state) => state.baerInitialize.timeInterval;


//export the actions
export const { setInfiltrometerType, setInitialVolume, setInfiltrometerSuction, setTimeInterval, setSoilType } = baerInitializeSlice.actions;



export default baerInitializeSlice.reducer;