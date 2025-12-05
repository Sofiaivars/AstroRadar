import { configureStore } from "@reduxjs/toolkit";
import userLocationReducer from './features/userLocation/userLocationSlice';
import suggestedCoordsReducer from './features/suggestedCoords/suggestedCoordsSlice';
import selectedBaseReducer from './features/selectedBase/selectedBaseSlice';
import eventListReducer from './features/eventList/eventListSlice';

const options = {
  reducer: {
    userLocation: userLocationReducer,
    suggestedCoords: suggestedCoordsReducer,
    selectedBase: selectedBaseReducer,
    eventList: eventListReducer,

  }
}

export const store = configureStore(options);