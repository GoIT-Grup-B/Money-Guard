export const selectTransactions = (state) =>
  state.transactions.transactions || [];
export const selectIsTransactionLoading = (state) =>
  state.transactions.isLoading;
export const selectTransCategories = (state) =>
  state.transactions.categories || [];
export const selectTransSummary = (state) => state.transactions.summary || [];
export const selectBalance = (state) => state.balance.balance;
export const selectToken = (state) => state.auth?.token || null;
