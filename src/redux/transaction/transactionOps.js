import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://wallet.b.goit.study/api';

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