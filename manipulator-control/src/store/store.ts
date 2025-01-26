import { configureStore } from '@reduxjs/toolkit';
import manipulatorReducer from './manipulatorSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    manipulator: manipulatorReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
