import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://wallet.b.goit.study/api';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${URL}/auth/sign-up`, data);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data, thunkAPI) => {
    try {
      console.log(data);
      const res = await axios.post(`${URL}/auth/sign-in`, data);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const signOutUser = createAsyncThunk(
  'auth/sign-out',
  async (token, thunkAPI) => {
    try {
      await axios.delete(`${URL}/auth/sign-out`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {};
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
