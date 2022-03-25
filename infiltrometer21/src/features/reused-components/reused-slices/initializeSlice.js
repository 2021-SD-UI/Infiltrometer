import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  initialVolume: 95,

  coordinates: {
    lat: 0,
    lon: 0,
  },

  soilType: {
    nh0: 2.28,
    alpha: 0.124
  },

  infiltrometerRadius: 2.25,
  infiltrometerSuction: -1,
  timeInterval: 60,
  site: "Site",
  observation: "Observation",

};

export const InitializeSlice = createSlice({

  name: 'baerInitialize',

  initialState,

  reducers: {
    setInitialVolume: (state, action) => {

      state.initialVolume = action.payload;

    },
    setInfiltrometerSuction: (state, action) => {
      state.infiltrometerSuction = action.payload;
    },
    setTimeInterval: (state, action) => {
      state.timeInterval = action.payload;
    },
    setSoilType: (state, action) => {
      state.soilType = action.payload;
    },
    setInfiltrometerData: (state, action) => {
      state.initialVolume = action.payload.initialVolume;
      state.coordinates = action.payload.coordinates;
      state.soilType = action.payload.soilType;
      state.timeInterval = action.payload.timeInterval;
      state.infiltrometerRadius = action.payload.infiltrometerRadius;
      state.infiltrometerSuction = action.payload.infiltrometerSuction;
      state.site = action.payload.site;
      state.observation = action.payload.observation;
    }

  }
});

export const selectInfiltrometerRadius = (state) => state.baerInitialize.infiltrometerR;
export const selectInfiltrometerSuction = (state) => state.baerInitialize.suction;
export const selectSoilType = (state) => state.baerInitialize.soilType;
export const selectInitialVolume = (state) => state.baerInitialize.initialVolume;
export const selectInfiltrometerData = (state) => state.baerInitialize;
export const selectTimeInterval = (state) => state.baerInitialize.timeInterval;
export const { setInitialVolume, setInfiltrometerSuction, setTimeInterval, setSoilType, setInfiltrometerData } = InitializeSlice.actions;

export default InitializeSlice.reducer;