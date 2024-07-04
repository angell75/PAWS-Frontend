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

export const fetchPetById = createAsyncThunk(
  'pets/fetchPetById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_URL.PETS}/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatePet = createAsyncThunk(
  'pets/updatePet',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${API_URL.PETS}/${id}`, formData, {
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

export const deletePet = createAsyncThunk(
  'pets/deletePet',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${API_URL.PETS}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Fetch user's pets
export const fetchUserPets = createAsyncThunk(
  'pets/fetchUserPets',
  async (userId, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.get(`${API_URL.PETS}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

// Add new pet
export const addNewPet = createAsyncThunk(
  'pets/addNewPet',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_URL.PETS, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
)

const petSlice = createSlice({
  name: 'pets',
  initialState: {
    pets: [],
    selectedPet: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pets = action.payload || []; 
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
      })
      .addCase(fetchPetById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPetById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedPet = action.payload;
        state.error = null;
      })
      .addCase(fetchPetById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updatePet.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePet.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.pets.findIndex(pet => pet.id === action.payload.id);
        if (index !== -1) {
          state.pets[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updatePet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deletePet.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePet.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pets = state.pets.filter(pet => pet.petId !== action.payload);
      })
      .addCase(deletePet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchUserPets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserPets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pets = action.payload;
      })
      .addCase(fetchUserPets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPet.fulfilled, (state, action) => {
        state.pets.push(action.payload);
      });
  },
});

export const { resetStatus } = petSlice.actions;

export default petSlice.reducer;
