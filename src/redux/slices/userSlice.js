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
      const response = await axiosInstance.post(API_URL.UPDATE_PROFILE, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.user;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_URL.CHANGE_PASSWORD, passwordData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${API_URL.USERS}/${id}`);
      return id;
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
      })
      .addCase(changePassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
