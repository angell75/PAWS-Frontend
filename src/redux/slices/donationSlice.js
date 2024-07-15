import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../Utils/axiosInstance';
import { API_URL } from '../../statis/url';  

export const makeDonation = createAsyncThunk(
  'donations/makeDonation',
  async (donationData, { rejectWithValue, getState }) => {
    const state = getState();
    const token = state.auth.token; 
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

export const fetchDonations = createAsyncThunk(
  'donations/fetchDonations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_URL.DONATIONS}`);
      const donations = response.data;

      // Fetch user details for each donation
      const userRequests = donations.map((donation) =>
        axiosInstance.get(`${API_URL.USERS}/${donation.userId}`)
      );
      const userResponses = await Promise.all(userRequests);
      const users = userResponses.map((res) => res.data);

      // Merge user details into donations
      const donationsWithUsers = donations.map((donation) => {
        const user = users.find((user) => user.userId === donation.userId);
        return { ...donation, donorName: user.name, status: user.status };
      });

      return donationsWithUsers;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
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
      })
      .addCase(fetchDonations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDonations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.donations = action.payload;
      })
      .addCase(fetchDonations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearError } = donationSlice.actions;
export default donationSlice.reducer;
