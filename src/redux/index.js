import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/slice';
import userReducer from './user/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
