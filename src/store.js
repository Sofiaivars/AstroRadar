import { configureStore } from "@reduxjs/toolkit";
import userLocationReducer from './features/userLocation/userLocationSlice';
import suggestedCoordsReducer from './features/suggestedCoords/suggestedCoordsSlice';

const options = {
  reducer: {
    userLocation: userLocationReducer,
    suggestedCoords: suggestedCoordsReducer,

  }
}

export const store = configureStore(options);