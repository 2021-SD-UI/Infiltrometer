import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import counterReducer from '../features/counter/counterSlice';

//BAER
import baerInitializeReducer from '../features/baer/baer-initialize/bear-initializeSlice';
import baerReplicationReducer from '../features/baer/baer-replication/bear-replicationSlice';
import baerResultsReducer from '../features/baer/baer-results/bear-resultsSlice';

//STANDARD
import standardInitializeReducer from '../features/standard/standard-initialize/standard-initializeSlice';
import standardReplicationReducer from '../features/standard/standard-replication/standard-replicationSlice';
import standardResultsReducer from '../features/standard/standard-results/standard-resultsSlice';

import reportsSlice from '../features/reports/reportsSlice';
import { reducer as reduxFormReducer } from 'redux-form'
import redirectReducer from '../features/page-redirection/redirector-slice';
import { persistReducer } from "redux-persist";
import storage from 'redux-persist-indexeddb-storage';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const reducers = combineReducers({
  //BAER
  baerInitialize: baerInitializeReducer,
  baerReplication: baerReplicationReducer,
  baerResults: baerResultsReducer,
  //STANDARD
  standardInitialize: standardInitializeReducer,
  standardReplication: standardReplicationReducer,
  standardResults: standardResultsReducer,

  counter: counterReducer,
  reports: reportsSlice,
  form: reduxFormReducer,
  redirector: redirectReducer

});

const persistConfig = {
  key: 'root',
  storage: storage('myDB'),
};

const persistedReducer = persistReducer(persistConfig, reducers);






export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
