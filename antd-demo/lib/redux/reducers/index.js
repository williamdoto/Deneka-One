import { combineReducers } from 'redux';
import authReducer from './authReducer';
import topBarReducer from '../slices/topBarSlice'; // Import the TopBar reducer

const rootReducer = combineReducers({
  auth: authReducer,
  topBar: topBarReducer, // Add the TopBar reducer
});

export default rootReducer;