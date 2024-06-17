import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../statis/url';  // Correct the path to your API URL

export const makeDonation = createAsyncThunk(
  'donations/makeDonation',
  async (donationData, { rejectWithValue, getState }) => {
    const state = getState();
    const token = state.auth.token; // Ensure you are getting the token correctly
    try {
      const response = await axios.post(API_URL.DONATIONS, donationData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const donationSlice = createSlice({
  name: 'donations',
  initialState: {
    donations: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeDonation.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(makeDonation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.donations.push(action.payload);
        state.error = null;
      })
      .addCase(makeDonation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      });
  },
});

export const { clearError } = donationSlice.actions;
export default donationSlice.reducer;
