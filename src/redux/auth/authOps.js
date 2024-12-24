import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://wallet.b.goit.study/api';

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }, thunkAPI) => {
    try {
      const res = await axios.post(`${URL}/auth/sign-up`, {
        username,
        email,
        password,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post(`${URL}/auth/sign-in`, {
        email,
        password,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const signOutUser = createAsyncThunk(
  'auth/sign-out',
  async (_, thunkAPI) => {
    try {
      await axios.delete(`${URL}/auth/sign-out`);
      return {};
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
