// lib/redux/slices/topBarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchInput: '',
  isDarkMode: false,
};

const topBarSlice = createSlice({
  name: 'topBar',
  initialState,
  reducers: {
    setSearchInput(state, action) {
      state.searchInput = action.payload;
    },
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { setSearchInput, toggleDarkMode } = topBarSlice.actions;
export default topBarSlice.reducer;
