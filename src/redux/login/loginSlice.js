import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  eMail: '',
  password: '',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},

  extraReducers: (builder) => {},
});

// export const {} = loginSlice.actions;
export default loginSlice.reducer;
