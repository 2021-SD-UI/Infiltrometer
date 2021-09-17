import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import baerInitializeReducer from '../features/baer-initialize/bear-initializeSlice';
import baerReplicationReducer from '../features/baer-replication/bear-replicationSlice';
import baerResultsReducer from '../features/baer-results/bear-resultsSlice';

export const store = configureStore({
  reducer: {
    baerInitialize: baerInitializeReducer,
    baerReplication: baerReplicationReducer,
    baerResults: baerResultsReducer,
    counter: counterReducer
  },
});
