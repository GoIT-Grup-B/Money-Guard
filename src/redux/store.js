import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginReducer from './login/loginSlice';
import registerReducer from './register/registerSlice';

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
