import { createSlice } from "@reduxjs/toolkit";
import { getToken, getUser } from "../Localstorage/storage";

const initialState = {
  user: getUser(),
  token: getToken(),
  isLoggedIn: !!getToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
    },

    logout(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const {login,logout} = authSlice.actions;
export default authSlice.reducer;
