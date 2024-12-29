import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectToken } from '../redux/selectors';

axios.defaults.baseURL = 'https://your-api-url.com/';

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getAll = createAsyncThunk(
  'transactions/getAll',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = selectToken(state);
      if (!token) {
        return thunkApi.rejectWithValue('No token found');
      }

      setAuthHeader(token);
      const response = await axios.get('/api/transactions');
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getTransactionCategories = createAsyncThunk(
  'transactions/getTransactionCategories',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = selectToken(state);
      if (!token) {
        return thunkApi.rejectWithValue('No token found');
      }

      setAuthHeader(token);
      const response = await axios.get('/api/transaction-categories');
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const postTransaction = createAsyncThunk(
  'transactions/postTransaction',
  async (transaction, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = selectToken(state);
      if (!token) {
        return thunkApi.rejectWithValue('No token found');
      }

      setAuthHeader(token);
      const response = await axios.post('/api/transactions', transaction);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const editTransaction = createAsyncThunk(
  'transactions/editTransaction',
  async ({ transactionId, transaction }, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = selectToken(state);
      if (!token) {
        return thunkApi.rejectWithValue('No token found');
      }

      setAuthHeader(token);
      const response = await axios.patch(
        `/api/transactions/${transactionId}`,
        transaction,
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (transactionId, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = selectToken(state);
      if (!token) {
        return thunkApi.rejectWithValue('No token found');
      }

      setAuthHeader(token);
      await axios.delete(`/api/transactions/${transactionId}`);
      return transactionId;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getTransactionSummaries = createAsyncThunk(
  'transactions/getTransactionSummaries',
  async ({ month, year } = {}, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = selectToken(state);
      if (!token) {
        return thunkApi.rejectWithValue('No token found');
      }

      setAuthHeader(token);

      const params = {};
      if (month) params.month = month;
      if (year) params.year = year;

      const response = await axios.get('/api/transactions-summary', {
        params,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
