import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://wallet.b.goit.study/api';

export const getCategories = createAsyncThunk(
    'transaction/getCategories',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.user.token;
        try {
            const response = await axios.get(`${URL}/transaction-categories`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || 'Failed to fetch categories');
        }
    }
);

export const addTransaction = createAsyncThunk(
    'transaction/addTransaction',
    async (transactionData, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.user.token;
        try {
            const response = await axios.post(`${URL}/transactions`, transactionData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || 'Failed to add transaction');
        }
    }
);

export const getTransaction = createAsyncThunk(
    "transaction/getTable",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.user.token;
        try {
            const response = await axios.get(`${URL}/transactions`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || 'Failed to fetch transactions');
        }
    }
);

export const deleteTransaction = createAsyncThunk(
    'transaction/deleteTransaction',
    async ({ transactionId }, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.user.token;
        try {
            const response = await axios.delete(`${URL}/transactions/${transactionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || 'Failed to delete transaction');
        }
    }
);