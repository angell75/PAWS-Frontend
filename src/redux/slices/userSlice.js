import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';
import { API_URL } from '../../statis/url';

const initialState = {
  user_info: '',
  status: 'idle',
  error: null,
};

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_URL.UPDATE_USER_PROFILE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.user;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user_info = action.payload;
    },
    clearUser: (state) => {
      return initialState; 
    },
  },
  extraReducers: (builder) => {
    builder
      // updateUserProfile
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user_info = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
