import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';
import { API_URL } from '../../statis/url';

export const submitApplication = createAsyncThunk(
  'applications/submitApplication',
  async (applicationData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_URL.APPLICATIONS, applicationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const applicationSlice = createSlice({
  name: 'applications',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitApplication.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitApplication.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(submitApplication.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default applicationSlice.reducer;
