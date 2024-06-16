import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';
import { API_URL } from '../../statis/url';

export const uploadPet = createAsyncThunk(
  'pets/uploadPet',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_URL.PETS, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchPets = createAsyncThunk(
  'pets/fetchPets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_URL.PETS);
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
      .addCase(fetchPets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pets = action.payload || []; // Ensure it's an array
        state.error = null;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
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
