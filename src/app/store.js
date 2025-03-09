import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducers from './rootReducers'; // Assuming you have a rootReducers file
import rootSaga from './rootSaga'; // Assuming you have a rootSaga file

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Combine reducers
const combinedReducer = combineReducers({
  ...rootReducers, // Include all reducers from rootReducers
});

// Root reducer that resets the state if needed (optional)
const rootReducer = (state, action) => {
  // You can reset state here if needed, for example on logout
  return combinedReducer(state, action);
};

// Configure the store
export const store = configureStore({
  reducer: rootReducer, // Pass the root reducer
  devTools: process.env.NODE_ENV !== 'production', // Enable DevTools in non-production environments
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), // Make sure saga middleware is included and disable default thunk middleware
});

// Run the saga middleware
sagaMiddleware.run(rootSaga);
