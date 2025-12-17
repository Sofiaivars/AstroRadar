import { getUserMissions } from "@services/events-missions-service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  missions: [],
  count: 0,
  status: 'idle'
}

export const fetchMissionList = createAsyncThunk(
  'missionList/fetchMissionList',
  async (userId, thunkAPI) => {
    const response = await getUserMissions(userId);
    return response;
  }
);

const options = {
  name: 'missionList',
  initialState,
  reducers: {
    clearMissionList: (state) => {
      state.missions = [];
      state.count = 0;
      state.status = 'idle';
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMissionList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMissionList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.missions = [...action.payload.missions];
        state.count = action.payload.count;
      })
      .addCase(fetchMissionList.rejected, (state) => {
        state.status = 'rejected';
      });
  }
}

const missionListSlice = createSlice(options);

export const { clearMissionList } = missionListSlice.actions;
export default missionListSlice.reducer;