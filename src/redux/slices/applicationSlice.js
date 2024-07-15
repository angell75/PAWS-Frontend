import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';
import { API_URL } from '../../statis/url';

// Thunk to submit a new application
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

// Thunk to fetch applications related to user's pets
export const fetchMyApplications = createAsyncThunk(
  'applications/fetchMyApplications',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_URL.APPLICATIONS}/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to approve an application
export const approveApplication = createAsyncThunk(
  'applications/approveApplication',
  async (applicationId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${API_URL.APPLICATIONS}/${applicationId}/approve`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to confirm adoption
export const confirmAdoption = createAsyncThunk(
  'applications/confirmAdoption',
  async ({ applicationId, petId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${API_URL.APPLICATIONS}/${applicationId}/confirm`, { petId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch all applications
export const fetchAllApplications = createAsyncThunk(
  'applications/fetchAllApplications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_URL.APPLICATIONS}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const applicationSlice = createSlice({
  name: 'applications',
  initialState: {
    myApplications: [], 
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
      })
      .addCase(fetchMyApplications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMyApplications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.myApplications = action.payload;
      })
      .addCase(fetchMyApplications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(approveApplication.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(approveApplication.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(approveApplication.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(confirmAdoption.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(confirmAdoption.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(confirmAdoption.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchAllApplications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllApplications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allApplications = action.payload;
      })
      .addCase(fetchAllApplications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default applicationSlice.reducer;
