// slices/petSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';
import { API_URL } from '../../statis/url';

export const uploadPet = createAsyncThunk(
  'pets/uploadPet',
  async (petData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in petData) {
        formData.append(key, petData[key]);
      }
      const response = await axiosInstance.post(API_URL.PETS, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const petSlice = createSlice({
  name: 'pets',
  initialState: {
    pets: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadPet.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadPet.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pets.push(action.payload);
        state.error = null;
      })
      .addCase(uploadPet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default petSlice.reducer;
