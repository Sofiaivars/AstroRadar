import { configureStore } from "@reduxjs/toolkit";
import userLocationReducer from '@features/userLocation/userLocationSlice';
import suggestedCoordsReducer from '@features/suggestedCoords/suggestedCoordsSlice';
import selectedBaseReducer from '@features/selectedBase/selectedBaseSlice';
import eventListReducer from '@features/eventList/eventListSlice';
import userDataReducer from '@features/userData/userDataSlice'

const options = {
  reducer: {
    userLocation: userLocationReducer,
    suggestedCoords: suggestedCoordsReducer,
    selectedBase: selectedBaseReducer,
    eventList: eventListReducer,
    userData: userDataReducer,

  }
}

export const store = configureStore(options);