import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: true,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = true;
      state.user = null;
    },
    checkAuth: (state) => {
      const token = localStorage.getItem('jwtToken');
      state.isAuthenticated = true;
      // state.isAuthenticated = !!token;
      // set user details if needed
    },
  },
});

export const { login, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
