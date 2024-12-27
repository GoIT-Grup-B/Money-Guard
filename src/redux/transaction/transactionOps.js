import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://wallet.b.goit.study/api';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI4MWI2NDRjYS0wM2EyLTQyMjItOTRlZi01Y2E2MjhiOGZkMDciLCJpYXQiOjE3MzUyNDg2OTYsImV4cCI6MTAwMDAwMDE3MzUyNDg2OTZ9.Y-Is1PBkkpTw10dJ8yQU-jVG7N6QXcsX3Iei5L5_FgM";

export const getCategories = createAsyncThunk(
    'transaction/getCategories',
    async (_, thunkAPI) => {
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
    async(token,thunkAPI)=>{
        try{
            const response = await axios.get(`${URL}/transactions`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message ||  'Server error');;
          }
    }

);

export const deleteTransaction = createAsyncThunk(
    "transaction/deleteTable",
    async({transactionId,token},thunkAPI)=>{
        try{
            const response = await axios.delete(`${URL}/transactions/${transactionId}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message ||  'Server error');;
          }
    }

);