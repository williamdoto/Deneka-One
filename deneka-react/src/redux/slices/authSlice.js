import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Placeholder for the actual API call to record sign-out time
async function recordSignOutTimeAPI(userId) {
  try {
    const response = await fetch('http://localhost:1337/api/sign-out', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json(); // Parse JSON response

    if (!response.ok) {
      // Handle HTTP-level errors
      throw new Error(data.message || 'Failed to record sign-out time');
    }

    return data; // Return the response data if everything went well
  } catch (error) {
    // Handle network errors or errors thrown from the condition above
    console.error('Error recording sign-out time:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const response = await recordSignOutTimeAPI(userId);
      console.log('Sign-out successful:', response);
      dispatch(logout()); // Dispatch the logout action here
      return response;
    } catch (error) {
      console.error('Error during sign out:', error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isAuthenticated: true,
  totpRequired: true,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log('Login payload:', action.payload);
      // state.isAuthenticated = true; // Assuming we set isAuthenticated here
      state.totpRequired = action.payload.totpRequired;
      state.user = action.payload.user; // Ensure action.payload includes the user object
      console.log('Logged in user:', state.user);
    },
    
    completeTOTP: (state) => {
      state.isAuthenticated = true;
      console.log('Logged in user after totp:', state.user);
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signOut.fulfilled, (state) => {
        // This is already handled in logout reducer
      });
  },
});

export const { login, completeTOTP, logout, checkAuth } = authSlice.actions;

export default authSlice.reducer;
