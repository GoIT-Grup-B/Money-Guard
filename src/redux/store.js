import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import balanceReducer from './balanceSlice';
import { transactionsReducer } from './transactionsSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { transactionReducer } from './transaction/transactionSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const rootReducer = combineReducers({
  user: persistReducer(authPersistConfig, authReducer),
  balance: balanceReducer,
  transactions: transactionsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
