import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserType {
  id: string;
  username: string;
  email: string;
  thumbnail: string;
}

const initialState: UserType = {
  id: '',
  username: '',
  email: '',
  thumbnail: '',
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.username = '';
      state.email = '';
    },
  },
});

export const { setUser, logout } = userReducer.actions;
export default userReducer.reducer;