import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEventsFromAPI } from "@services/events-missions-service";

const initialState = {
  events: [],
  status: 'idle'
}

export const fetchEventList = createAsyncThunk(
  'eventList/fetchEventList',
  async (_, thunkAPI) => {
    const response = await getEventsFromAPI();
    return response;
  }
);

const options = {
  name: 'eventList',
  initialState,
  reducers: {
    clearEventList: (state) => {
      state.events = [];
      state.status = 'idle';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEventList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEventList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = [...action.payload];
      })
      .addCase(fetchEventList.rejected, (state) => {
        state.status = 'rejected';
      });
  }
}

const eventListSlice = createSlice(options);

export const { clearEventList } = eventListSlice.actions;
export default eventListSlice.reducer;