import { createSlice } from '@reduxjs/toolkit';
import {getTransaction} from "./transactionOps";

const initialState = {
  // Transaction ile ilgili state'ler
  transactions: [], // Transaction listesi için array eklendi
  currentTransaction: {
    transactionDate: "",
    type: "",
    categoryId: "",
    comment: "",
    amount: 0,
  },
  
  // User ile ilgili state'ler (eğer gerekiyorsa ayrı bir slice'a taşınabilir)
  user: {
    id: '',
    username: '',
    email: '',
    balance: 0,
  },

  // UI state'leri
  loading: false,
  error: null,
  isLoggedIn: false,
  token: '',
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    // Sync action'lar için reducer'lar buraya eklenebilir
    resetTransactionState: (state) => {
      state.currentTransaction = initialState.currentTransaction;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.transactions = action.payload; // Gelen transaction verilerini state'e kaydet
      })
      .addCase(getTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred'; // Error handling iyileştirildi
      });
  }
});

// Action creator'ları export et
export const { resetTransactionState } = transactionSlice.actions;

// Reducer'ı export et
export const transactionReducer = transactionSlice.reducer;