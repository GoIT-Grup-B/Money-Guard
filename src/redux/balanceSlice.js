import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 24000,
  currency: [
    { name: 'USD', purchase: 27.55, sale: 27.65 },
    { name: 'EUR', purchase: 30.0, sale: 30.1 },
  ],
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    updateBalance(state, action) {
      state.balance = action.payload;
    },
    updateCurrency(state, action) {
      state.currency = action.payload;
    },
  },
});

export const { updateBalance, updateCurrency } = balanceSlice.actions;
export default balanceSlice.reducer;
