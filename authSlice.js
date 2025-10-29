import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],        // store multiple users
  currentUser: null // currently logged-in user
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;

      const existingUser = state.users.find(u => u.username === username);

      if (!existingUser) {
        // First-time user → save
        state.users.push({ username, password });
      }

      // Set currentUser
      state.currentUser = { username };
    },
    logout: (state) => {
      state.currentUser = null;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
