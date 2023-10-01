import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: [],
  accessToken: null,
  message: null,
  redirectURI: null,
  emailAuth: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveEmailToken(state, { payload }) {
      console.log(payload, "activateAlertSide Slice");
      state.emailAuth = payload;
    },
    saveProfile(state, { payload }) {
      state.profile = payload;
      state.accessToken = payload?.accessToken;
    },
    saveRedirectURI(state, { payload }) {
      state.redirectURI = payload;
    },
    saveMessage(state, { payload }) {
      state.message = payload;
    },
    clearProfile(state, { payload }) {
      state.profile = [];
    },
  },
});

export const {
  clearProfile,
  saveEmailToken,
  saveProfile,
  saveRedirectURI,
  saveMessage,
} = authSlice.actions;

export default authSlice.reducer;
