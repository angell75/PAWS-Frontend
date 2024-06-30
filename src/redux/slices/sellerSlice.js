import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';
import { API_URL } from '../../statis/url';

// Fetch summary data
export const fetchSummaryData = createAsyncThunk(
  'seller/fetchSummaryData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_URL.SUMMARY);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const sellerSlice = createSlice({
  name: 'seller',
  initialState: {
    summaryData: {
      totalProducts: 0,
      totalCustomers: 0,
      totalOrders: 0,
      orderStatusCounts: {
        'Order Received': 0,
        'Pending Payment': 0,
        'Shipped': 0,
        'Completed': 0,
      },
      productCategoryCounts: {
        'food': 0,
        'treat': 0,
        'training-needs': 0,
        'clothes-accessories': 0,
        'supplies-others': 0,
      },
    },
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSummaryData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSummaryData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.summaryData = action.payload;
      })
      .addCase(fetchSummaryData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || action.error.message;
      });
  },
});

export default sellerSlice.reducer;
