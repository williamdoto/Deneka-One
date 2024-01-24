import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: true,
  totpRequired: true, // New state to track if TOTP input is required
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.totpRequired = true; // Set TOTP as required upon login
      state.user = action.payload;
    },
    completeTOTP: (state) => {
      state.isAuthenticated = true; // Set isAuthenticated to true after TOTP is completed
      state.totpRequired = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.totpRequired = false;
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

export const { login, completeTOTP, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;