import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching services
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async () => {
    const response = await axios.get('https://yourapi.com/services');
    return response.data;
  }
);

// Async thunk for adding a new service
export const addNewService = createAsyncThunk(
  'services/addNewService',
  async (newServiceData) => {
    const response = await axios.post('https://yourapi.com/services', newServiceData);
    return response.data;
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    services: [],
    loading: false,
    error: null,
    addingService: {
      serviceName: '',
      serviceDesc: '',
      servicePrice: '',
      categories: [],
      selectedCategories: [],
      addLoading: false,
    },
  },
  reducers: {
    setServiceName: (state, action) => {
      state.addingService.serviceName = action.payload;
    },
    setServiceDesc: (state, action) => {
      state.addingService.serviceDesc = action.payload;
    },
    setServicePrice: (state, action) => {
      state.addingService.servicePrice = action.payload;
    },
    setSelectedCategories: (state, action) => {
      state.addingService.selectedCategories = action.payload;
    },
    setCategories: (state, action) => {
      state.addingService.categories = action.payload;
    },
    // Additional reducers can be added here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addNewService.pending, (state) => {
        state.addingService.addLoading = true;
      })
      .addCase(addNewService.fulfilled, (state, action) => {
        state.addingService.addLoading = false;
        state.services.push(action.payload); // Add new service to the list
      })
      .addCase(addNewService.rejected, (state, action) => {
        state.addingService.addLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setServiceName, 
  setServiceDesc, 
  setServicePrice, 
  setSelectedCategories,
  setCategories
} = servicesSlice.actions;

export default servicesSlice.reducer;
