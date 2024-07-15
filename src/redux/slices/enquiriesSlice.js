import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';
import { API_URL } from '../../statis/url';

export const fetchEnquiries = createAsyncThunk(
  'enquiries/fetchEnquiries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_URL.ENQUIRIES}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEnquiryStatus = createAsyncThunk(
  'enquiries/updateEnquiryStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${API_URL.ENQUIRIES}/${id}/update-status`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
    enquiries: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnquiries.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEnquiries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.enquiries = action.payload;
      })
      .addCase(fetchEnquiries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateEnquiryStatus.fulfilled, (state, action) => {
        const updatedEnquiry = action.payload;
        const existingEnquiry = state.enquiries.find((enquiry) => enquiry.enquiryId === updatedEnquiry.enquiryId);
        if (existingEnquiry) {
          existingEnquiry.status = updatedEnquiry.status;
        }
      })
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
