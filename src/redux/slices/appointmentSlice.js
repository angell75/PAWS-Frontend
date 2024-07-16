import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';
import { API_URL } from '../../statis/url';

export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (userId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axiosInstance.get(`${API_URL.APPOINTMENTS}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
);

export const createAppointment = createAsyncThunk(
  'appointments/createAppointment',
  async (appointmentData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axiosInstance.post(API_URL.APPOINTMENTS, appointmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
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
);

export const cancelAppointment = createAsyncThunk(
  'appointments/cancelAppointment',
  async (appointmentId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axiosInstance.post(`${API_URL.APPOINTMENTS}/${appointmentId}/cancel`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
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
);

export const fetchAppointmentsByVet = createAsyncThunk(
  'appointments/fetchAppointmentsByVet',
  async (vetId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axiosInstance.get(`${API_URL.APPOINTMENTS}/vet/${vetId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
);

export const fetchAppointmentsByPet = createAsyncThunk(
  'appointments/fetchAppointmentsByPet',
  async (petId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_URL.APPOINTMENTS}/pet/${petId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateAppointment = createAsyncThunk(
  'appointments/updateAppointment',
  async ({ petId, appointmentId, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${API_URL.APPOINTMENTS}/pets/${petId}/appointments/${appointmentId}`, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.appointments.push(action.payload);
      })
      .addCase(cancelAppointment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = state.appointments.map(appointment =>
          appointment.id === action.meta.arg ? { ...appointment, status: 'cancelled' } : appointment
        );
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAppointmentsByVet.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointmentsByVet.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(fetchAppointmentsByVet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAppointmentsByPet.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointmentsByPet.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(fetchAppointmentsByPet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateAppointment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default appointmentSlice.reducer;
