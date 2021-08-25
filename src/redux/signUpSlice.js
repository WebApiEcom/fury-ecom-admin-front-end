import { createSlice } from "@reduxjs/toolkit";

const signUpSlice = createSlice({
  name: "signin",
  initialState: {
    email: "",
    password: "",
    cpassword: "",
  },
  reducers: {
    setEmail: (state, action) => {
      const { email } = action.payload;
      state.email = email;
    },
    setPassword: (state, action) => {
      const { password } = action.payload;
      state.password = password;
    },
    setCPassword: (state, action) => {
      const { cpassword } = action.payload;
      state.cpassword = cpassword;
    },
    clearEmailPassword: (state, action) => {
      const { email, password, cpassword } = action.payload;
      state.email = email;
      state.password = password;
      state.cpassword = cpassword;
    },
  },
});

export const {
  setEmail,
  setPassword,
  setCPassword,
  signInDrawerVisibility,
  clearEmailPassword,
} = signUpSlice.actions;

export default signUpSlice.reducer;
