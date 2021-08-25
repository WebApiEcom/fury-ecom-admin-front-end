import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    getUser: () => {},

    setUser: (state, action) => {
      //   const userData = action.payload;
      //   return { ...state, ...userData };
      state.user = action.payload;
    },
  },
});

export const { getUser, setUser } = userSlice.actions;

export default userSlice.reducer;
