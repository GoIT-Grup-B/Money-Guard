import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, signOutUser } from './authOps';

const initialState = {
  user: {
    id: '',
    username: '',
    email: '',
    balance: 0,
  },

  loading: false,
  error: null,
  token: '',
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    //REGISTER - SIGN UP
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = false;
      state.error = null;
      state.isLoggedIn = true;
    });

    //LOG IN
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.token = '';
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = false;
      state.error = null;
      state.isLoggedIn = true;
    });

    //SIGN OUT
    builder.addCase(signOutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(signOutUser, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(signOutUser, (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default userSlice.reducer;
// export const {} = userSlice.actions;
