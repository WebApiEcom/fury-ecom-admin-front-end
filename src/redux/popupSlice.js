import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    logoutModelVisibale: false,
    signInDrawerVisibale: false,
  },
  reducers: {
    // increment: (state) => {
    //   state.count += 1;
    // },
    // decrement: (state) => ({ ...state, count: state.count - 1 }),
    // test: (state, action) => {
    //   const { testValue } = action.payload;
    //   state.count = state.count + testValue;
    // },
    logoutModelVisibility: (state, action) => {
      const { modelValue } = action.payload;
      state.logoutModelVisibale = modelValue;
    },
    signInDrawerVisibility: (state, action) => {
      const { modelValue } = action.payload;
      state.signInDrawerVisibale = modelValue;
    },
  },
});

export const { logoutModelVisibility, signInDrawerVisibility } =
  popupSlice.actions;

export default popupSlice.reducer;
