import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://wallet.b.goit.study/api';

export const getTransaction = createAsyncThunk(
    "transaction/getTable",
    async(_,thunkAPI)=>{
        try{
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI4MWI2NDRjYS0wM2EyLTQyMjItOTRlZi01Y2E2MjhiOGZkMDciLCJpYXQiOjE3MzUyNDg2OTYsImV4cCI6MTAwMDAwMDE3MzUyNDg2OTZ9.Y-Is1PBkkpTw10dJ8yQU-jVG7N6QXcsX3Iei5L5_FgM"
            //thunkAPI.getState().auth.token; 
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