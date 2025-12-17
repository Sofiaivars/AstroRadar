import { getUserMissions } from "@services/events-missions-service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  missions: [],
  count: 0,
  status: 'idle',
  error: null,
}

export const fetchMissionList = createAsyncThunk(
  'missionList/fetchMissionList',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getUserMissions(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error al obtener misiones");
    }
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
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMissionList.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMissionList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.missions = [...action.payload.missions];
        state.count = action.payload.count;
        state.error = null;
      })
      .addCase(fetchMissionList.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.error.message;
      });
  }
}

const missionListSlice = createSlice(options);

export const { clearMissionList } = missionListSlice.actions;
export default missionListSlice.reducer;