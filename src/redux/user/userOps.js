import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://wallet.b.goit.study/api';

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ username, email, password }, thunkAPI) => {
    try {
      const res = await axios.post(`${URL}/auth/sign-up`, {
        username,
        email,
        password,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post(`${URL}/auth/sign-in`, {
        email,
        password,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
