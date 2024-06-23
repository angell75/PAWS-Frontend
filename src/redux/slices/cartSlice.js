import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';
import { API_URL } from '../../statis/url';

// Add to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (product, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const userId = state.user.user_info.userId;

      const response = await axiosInstance.post(`${API_URL.CART}`, {
        userId,
        productId: product.id,
        quantity: 1,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
        Swal.fire('Success', 'Product added to cart', 'success'); // Success alert
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        Swal.fire('Error', action.error.message, 'error'); // Error alert
      });
  },
});

export default cartSlice.reducer;
