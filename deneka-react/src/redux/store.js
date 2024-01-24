import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import servicesReducer from './slices/servicesSlice'; // Import the services reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    services: servicesReducer, // Add the services reducer to the store
  },
});

export default store;
