import { createSlice } from "@reduxjs/toolkit";

const options = {
  name: 'eventList',
  initialState: [],
  reducers: {
    clearEventList: () => [],
    setEventList: (state, action) => {
      state.push(action.payload);
    }
  }
}

const eventListSlice = createSlice(options);

export const { clearEventList, setEventList } = eventListSlice.actions;
export default eventListSlice.reducer;