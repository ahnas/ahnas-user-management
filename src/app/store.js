import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducers from './rootReducers';
import rootSaga from './rootSaga'; 

const sagaMiddleware = createSagaMiddleware();


const combinedReducer = combineReducers({
  ...rootReducers, 
});


const rootReducer = (state, action) => {
  
  return combinedReducer(state, action);
};


export const store = configureStore({
  reducer: rootReducer, 
  devTools: process.env.NODE_ENV !== 'production', 
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), 
});


sagaMiddleware.run(rootSaga);
