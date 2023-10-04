import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import axios from "axios";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    data: Cookies.get("token") || null,
    registerSuccess: false,
  },
  reducers: {
    logout: (state) => {
      state.data = null;
      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        if (action.payload.success) {
          toast.success(action.payload.message);
          Cookies.set("token", action.payload.data, { secure: true });
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message);
      })
      .addCase(handleRegister.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleRegister.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          toast.success(action.payload.message);
          state.registerSuccess = true;
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(handleRegister.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message);
      });
  },
});

export default loginSlice.reducer;
export const { logout } = loginSlice.actions;

// Thunks
export const handleLogin = createAsyncThunk("login", async (data) => {
  try {
    const response = await axios.post("user/login", data);
    return response.data;
  } catch (error) {
    return error?.response?.data || error.message;
  }
});

export const handleRegister = createAsyncThunk("register", async (data) => {
  try {
    const response = await axios.post("user/register", data);
    return response.data;
  } catch (error) {
    return error?.response?.data || error.message;
  }
});
