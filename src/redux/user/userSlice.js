import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './userOps';

const initialState = {
  loading: false,
  error: null,
  name: '',
  mail: '',
  token: '',
  password: '',
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    //REGISTER - SIGN UP
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.token = '';
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
      state.isLoggedIn = true;
    });

    //LOG IN
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.token = '';
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
      state.isLoggedIn = true;
    });
  },
});

export default userSlice.reducer;
// export const {} = userSlice.actions;
