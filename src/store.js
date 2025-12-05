import { configureStore } from "@reduxjs/toolkit";
import userLocationReducer from './features/userLocation/userLocationSlice';
import suggestedCoordsReducer from './features/suggestedCoords/suggestedCoordsSlice';
import selectedBaseReducer from './features/selectedBase/selectedBaseSlice';

const options = {
  reducer: {
    userLocation: userLocationReducer,
    suggestedCoords: suggestedCoordsReducer,
    selectedBase: selectedBaseReducer,

  }
}

export const store = configureStore(options);