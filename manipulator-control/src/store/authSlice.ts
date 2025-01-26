import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../types/types';

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string; password: string }>) => {
      if (action.payload.username === 'admin' && action.payload.password === 'admin') {
        state.isAuthenticated = true;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
