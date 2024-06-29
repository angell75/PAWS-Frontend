import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';
import Swal from "sweetalert2";
import { API_URL } from '../../statis/url';

// Thunk to create a new order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_URL.ORDERS, orderData);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to fetch user orders
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_URL.ORDERS}/user/${userId}`);
      console.log(response.data); // Debug the response
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders.push(action.payload);
        Swal.fire('Success', 'Order placed successfully!', 'success');
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        Swal.fire('Error', action.payload.message, 'error');
      })
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        Swal.fire('Error', action.payload.message, 'error');
      });
  },
});

export default orderSlice.reducer;
