// redux/slices/uiSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collapsed: false,
  isSidebarRight: false,
  isDarkMode: false,
  notificationVisible: false,
  drawerPinned: false,
  notificationBarPinned: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
    toggleSidebarPosition: (state) => {
      state.isSidebarRight = !state.isSidebarRight;
      state.collapsed = true; // Assuming to collapse when toggling position
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    toggleNotificationVisible: (state) => {
      state.notificationVisible = !state.notificationVisible;
    },
    toggleNotificationBarPinned: (state) => {
        state.notificationBarPinned = !state.notificationBarPinned;
      },
    toggleDrawerPinned: (state) => {
      state.drawerPinned = !state.drawerPinned;
    },
  },
});

export const { 
  toggleCollapsed, 
  toggleSidebarPosition, 
  toggleDarkMode, 
  toggleNotificationVisible, 
  toggleDrawerPinned,
  toggleNotificationBarPinned 
} = uiSlice.actions;

export default uiSlice.reducer;
