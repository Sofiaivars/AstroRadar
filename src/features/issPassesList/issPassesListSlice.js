import { getISSPasses } from "@services/events-missions-service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  passes: [],
  status: 'idle'
}

export const fetchIssPassesList = createAsyncThunk(
  'issPassesList/fetchIssPassesList',
  async (coords, thunkAPI) => {
    const response = await getISSPasses(coords);
    return response;
  }
);

const options = {
  name: 'issPassesList',
  initialState,
  reducers: {
    clearIssPassesList: (state) => {
      state.passes = [];
      state.status = 'idle';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchIssPassesList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIssPassesList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.passes = [...action.payload];
      })
      .addCase(fetchIssPassesList.rejected, (state) => {
        state.status = 'rejected';
      });
  }
}

const issPassesListSlice = createSlice(options);
export const { clearIssPassesList } = issPassesListSlice.actions;
export default issPassesListSlice.reducer;