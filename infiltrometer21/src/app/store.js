import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import counterReducer from '../features/counter/counterSlice';
import baerInitializeReducer from '../features/baer-initialize/bear-initializeSlice';
import baerReplicationReducer from '../features/baer-replication/bear-replicationSlice';
import baerResultsReducer from '../features/baer-results/bear-resultsSlice';
import reportsSlice from '../features/reports/reportsSlice';
import {reducer as reduxFormReducer} from 'redux-form'
import  redirectReducer  from '../features/page-redirection/redirector-slice';




export const store = configureStore({
  reducer: {
    baerInitialize: baerInitializeReducer,
    baerReplication: baerReplicationReducer,
    baerResults: baerResultsReducer,
    counter: counterReducer,
    reports: reportsSlice,
    form: reduxFormReducer,
    redirector: redirectReducer
  },
});
