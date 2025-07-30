import { createSlice } from "@reduxjs/toolkit";

// Tenta recuperar o token e o user do localStorage para manter sessão ativa
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isAuthenticated: !!token,
  token: token || null,
  user: user ? JSON.parse(user) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user || null;

      localStorage.setItem("token", action.payload.token);
      if (action.payload.user) {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
