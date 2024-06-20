import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';
import { API_URL } from '../../statis/url';

export const submitEnquiry = createAsyncThunk(
  'enquiries/submitEnquiry',
  async (enquiryData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_URL.ENQUIRIES, enquiryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const enquiriesSlice = createSlice({
  name: 'enquiries',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitEnquiry.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitEnquiry.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(submitEnquiry.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default enquiriesSlice.reducer;
