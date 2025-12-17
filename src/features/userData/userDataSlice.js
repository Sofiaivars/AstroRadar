import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: null,
  lastName: null,
  username: null,
  image: null,
  email: null,
  city: null,
  country: null,
  rol: null,
  isActive: null,
  createdAt: null,
}

const options = {
  name: 'userData',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.id = null;
      state.name = null;
      state.lastName = null;
      state.username = null;
      state.image = null;
      state.email = null;
      state.city = null;
      state.country = null;
      state.rol = null;
      state.isActive = null;
      state.createdAt = null;
    },
    setUserData: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
      state.username = action.payload.username;
      state.image = action.payload.image;
      state.email = action.payload.email;
      state.city = action.payload.city;
      state.country = action.payload.country;
      state.rol = action.payload.rol;
      state.isActive = action.payload.isActive;
      state.createdAt = action.payload.createdAt;
    }
  }
};

const userDataSlice = createSlice(options);

export const { clearUserData, setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;