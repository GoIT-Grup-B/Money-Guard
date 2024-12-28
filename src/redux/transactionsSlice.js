import { createSlice } from '@reduxjs/toolkit';
import {
  getAll,
  postTransaction,
  editTransaction,
  deleteTransaction,
  getTransactionCategories,
  getTransactionSummaries,
} from '../redux/operations';

const initialState = {
  summary: [],
  categories: [],
  transactions: [],
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.error = null;
  state.isLoading = true;
};

const handleReject = (state, action) => {
  state.error = action.payload || 'An error occurred';
  state.isLoading = false;
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        state.transactions = action.payload || [];
        state.isLoading = false;
      })
      .addCase(getAll.pending, handlePending)
      .addCase(getAll.rejected, handleReject)

      .addCase(postTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
        state.isLoading = false;
      })
      .addCase(postTransaction.pending, handlePending)
      .addCase(postTransaction.rejected, handleReject)

      .addCase(editTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(
          (transaction) => transaction.id === action.payload.id,
        );
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(editTransaction.pending, handlePending)
      .addCase(editTransaction.rejected, handleReject)

      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== action.payload,
        );
        state.isLoading = false;
      })
      .addCase(deleteTransaction.pending, handlePending)
      .addCase(deleteTransaction.rejected, handleReject)

      .addCase(getTransactionCategories.fulfilled, (state, action) => {
        state.categories = action.payload || [];
        state.isLoading = false;
      })
      .addCase(getTransactionCategories.pending, handlePending)
      .addCase(getTransactionCategories.rejected, handleReject)

      .addCase(getTransactionSummaries.fulfilled, (state, action) => {
        state.summary = action.payload || [];
        state.isLoading = false;
      })
      .addCase(getTransactionSummaries.pending, handlePending)
      .addCase(getTransactionSummaries.rejected, handleReject);
  },
});

export const transactionsReducer = transactionsSlice.reducer;
