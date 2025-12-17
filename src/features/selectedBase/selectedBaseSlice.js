import { createSlice } from "@reduxjs/toolkit";

const options = {
  name: 'selectedBase',
  initialState: {
    name: null,
    coordinates: {
      latitude: null,
      longitude: null,
    }
  },
  reducers: {
    setSelectedBase: (state, action) => {
      state.name = action.payload.name;
      state.coordinates = {
        latitude: action.payload.coordinates.latitude,
        longitude: action.payload.coordinates.longitude,
      }
    },
    removeSelectedBase: (state) => {
      state.name = null;
      state.coordinates = {
        latitude: null,
        longitude: null,
      }
    }
  }
}

const selectedBaseSlice = createSlice(options);

export const { setSelectedBase, removeSelectedBase } = selectedBaseSlice.actions;
export default selectedBaseSlice.reducer;