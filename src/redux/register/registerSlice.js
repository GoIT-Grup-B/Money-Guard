import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  eMail: '',
  password: '',
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},

  extraReducers: (builder) => {},
});

// export const {} = registerSlice.actions;
export default registerSlice.reducer;
