import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "taro",
  age: 12,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});
export const {} = userSlice.actions;

export default userSlice.reducer;
