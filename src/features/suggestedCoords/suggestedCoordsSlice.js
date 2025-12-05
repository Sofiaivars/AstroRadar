import { createSlice } from "@reduxjs/toolkit";

const options = {
  name: 'suggestedCoords',
  initialState: [],
  reducers: {
    clearSuggestedCoords: () => [],
    setSuggestedCoords: (state, action) => {
      state.push(action.payload)
    }
  }
};

const suggestedCoordsSlice = createSlice(options);

export const { clearSuggestedCoords, setSuggestedCoords } = suggestedCoordsSlice.actions;
export default suggestedCoordsSlice.reducer;