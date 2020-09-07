import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    uid: undefined,
    name: undefined,
    email: undefined,
  },
  reducers: {
    userUpdated(state, action) {
      if (!action.payload) {
        throw new Error(
          'Error in auth reducer - user data in DB was probably deleted.',
        );
      }
      const { name } = action.payload;
      // N.B. createSlice wraps your function with `produce` from the `Immer` library. This means
      // you can write code that "mutates" the state inside the reducer, and Immer will safely
      // return a correct immutably updated result!
      state.name = name;
    },
    loggedIn(state, action) {
      const { uid, name, email } = action.payload;
      state.uid = uid;
      state.name = name;
      state.email = email;
    },
    loggedOut(state, action) {
      state.uid = undefined;
      state.name = undefined;
      state.email = undefined;
    },
  },
});

export const { loggedIn, loggedOut } = authSlice.actions;

export default authSlice.reducer;
