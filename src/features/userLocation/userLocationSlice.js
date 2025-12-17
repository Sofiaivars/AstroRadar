import { createSlice } from "@reduxjs/toolkit";

const options = {
  name: 'userLocation',
  initialState: {
    latitude: null,
    longitude: null,
  },
  reducers: {
    setUserLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    removeUserLocation: (state) => {
      state.latitude = null;
      state.longitude = null;
    }
  }
}

const userLocationSlice = createSlice(options);

export const { setUserLocation, removeUserLocation } = userLocationSlice.actions;
export default userLocationSlice.reducer;