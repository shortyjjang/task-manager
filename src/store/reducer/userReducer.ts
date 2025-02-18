import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserType {
  id: string;
  name: string;
  email: string;
  thumbnail: string;
}

const initialState: UserType = {
  id: '',
  name: '',
  email: '',
  thumbnail: '',
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.name = '';
      state.email = '';
    },
  },
});

export const { setUser, logout } = userReducer.actions;
export default userReducer.reducer;