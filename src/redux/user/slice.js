import { createSlice } from '@reduxjs/toolkit';

import { loggedOut } from 'redux/auth/slice';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: undefined,
  },
  reducers: {
    userUpdated(state, action) {
      if (!action.payload) {
        throw new Error(
          'Error in user reducer - user data in DB was probably deleted.',
        );
      }
      const { name } = action.payload;
      state.name = name;
    },
  },
  extraReducers: {
    [loggedOut]: (state, action) => {
      state.name = undefined;
    },
  },
});

export const { userUpdated } = userSlice.actions;

export default userSlice.reducer;
