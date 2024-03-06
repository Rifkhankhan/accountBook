import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'expanse',
  initialState: {
    isAuthenticated: false,
    token: null,
    user: []
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
    },
    autoLogin: (state, action) => {
      state.isAuthenticated = false;
    }
  }
});

export const authActions = authSlice.actions;
// export const classAction = classSlice.actions

export default authSlice.reducer;
