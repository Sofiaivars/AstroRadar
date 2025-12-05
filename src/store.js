import { configureStore } from "@reduxjs/toolkit";
import userLocationReducer from './features/userLocation/userLocationSlice';

const options = {
  reducer: {
    userLocation: userLocationReducer,
  }
}

export const store = configureStore(options);