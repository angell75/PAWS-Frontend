import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';
import Swal from "sweetalert2";
import { API_URL } from '../../statis/url';

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

export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (userId = null, { rejectWithValue }) => {
    try {
      const url = userId ? `${API_URL.ORDERS}/user/${userId}` : API_URL.ORDERS;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${API_URL.ORDERS}/update-status/${orderId}`, { status });
      return response.data.order; 
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
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedOrder = action.payload;
        state.orders = state.orders.map((order) =>
          order.orderId === updatedOrder.orderId ? updatedOrder : order
        );
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        Swal.fire('Error', action.payload.message, 'error');
      });
  },
});

export default orderSlice.reducer;
