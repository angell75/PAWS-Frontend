import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';
import { API_URL } from '../../statis/url';

const initialState = {
  status: 'idle',
  totalUsers: 0,
  totalVets: 0,
  totalPets: 0,
  totalDonations: 0,
  totalAdoptedPets: 0,
  totalEnquiries: 0,
  monthlyDonations: [],
  userRoleCounts: { customer: 0, vet: 0 },
  users: [],
  error: null,
};

export const fetchDashboardData = createAsyncThunk(
  'admin/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_URL.ADMIN_DASHBOARD);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


// Fetch users
export const fetchUsersData = createAsyncThunk(
  'admin/fetchUsersData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_URL.USERS}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.totalUsers = action.payload.totalUsers;
        state.totalVets = action.payload.totalVets;
        state.totalPets = action.payload.totalPets;
        state.totalDonations = action.payload.totalDonations;
        state.totalAdoptedPets = action.payload.totalAdoptedPets;
        state.totalEnquiries = action.payload.totalEnquiries;
        state.monthlyDonations = action.payload.monthlyDonations;
        state.userRoleCounts = action.payload.userRoleCounts;
        state.error = null;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchUsersData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsersData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsersData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
