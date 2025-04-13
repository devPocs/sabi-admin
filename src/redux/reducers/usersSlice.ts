import { createSlice } from "@reduxjs/toolkit";
import { user } from "../../interface/user";

const initialState: user = {
  data: {},
  isLoggedIn: false,
  role: undefined,
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.isLoggedIn = false;
      state.data = {};
      state.role = undefined;
    },
    logIn: (state, action) => {
      state.data = action.payload;
      state.isLoggedIn = true;
      //state.role = "admin";
      state.role = (action.payload?.userInfo?.role).toLowerCase();
      console.log(state.role, "role!");
      console.log(state.role);
    },
  },
});

export const { logIn, logOut } = usersSlice.actions;

export default usersSlice.reducer;
