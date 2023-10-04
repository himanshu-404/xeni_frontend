import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        if (!action.payload.success) {
          toast.error(action.payload.message);
        }
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message);
      });
  },
});

export default userSlice.reducer;

// Thunks
export const getUserDetails = createAsyncThunk("user", async () => {
  try {
    const response = await axios.get("user/", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data || error.message;
  }
});
