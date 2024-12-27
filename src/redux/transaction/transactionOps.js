import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';

const URL = 'https://wallet.b.goit.study/api';

export const getTransaction = createAsyncThunk(
    "transaction/getTable",
    async(_,thunkAPI)=>{
        try{
            const token = useSelector((store) => store.user.token);
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
    async(transactionId,thunkAPI)=>{
        try{
            const token = useSelector((store) => store.user.token);
            const response = await axios.delete(`${URL}/transactions/{transactionId}`,{
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