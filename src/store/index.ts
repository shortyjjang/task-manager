import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/userReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// 스토어의 타입을 추론
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;