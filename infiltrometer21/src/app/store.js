import { configureStore } from '@reduxjs/toolkit';
import { combineReducers }  from 'redux';
import counterReducer from '../features/counter/counterSlice';
import baerInitializeReducer from '../features/baer/baer-initialize/bear-initializeSlice';
import baerReplicationReducer from '../features/baer/baer-replication/bear-replicationSlice';
import baerResultsReducer from '../features/baer/baer-results/bear-resultsSlice';
import reportsSlice from '../features/reports/reportsSlice';
import {reducer as reduxFormReducer} from 'redux-form'
import  redirectReducer  from '../features/page-redirection/redirector-slice';
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
  baerInitialize: baerInitializeReducer,
  baerReplication: baerReplicationReducer,
  baerResults: baerResultsReducer,
  counter: counterReducer,
  reports: reportsSlice,
  form: reduxFormReducer,
  redirector: redirectReducer

});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig,reducers);






export const store = configureStore({
    reducer: persistedReducer
});
