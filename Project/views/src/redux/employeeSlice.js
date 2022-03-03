import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import employeeAPI from "../api/employeeAPI";

export const login = createAsyncThunk("employee/login", async (payload) => {
  const data = await employeeAPI.login(payload);

  localStorage.setItem("employee", JSON.stringify(data));

  return data;
});

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    current: JSON.parse(localStorage.getItem("employee")) || {},
  },
  reducers: {
    logout(state) {
      state.current = {};
      localStorage.removeItem("employee");
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const {actions, reducer} = employeeSlice;
export const {logout} = actions;
export default reducer;
