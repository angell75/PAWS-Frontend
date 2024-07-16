import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';
import Swal from 'sweetalert2';
import { API_URL } from '../../statis/url';

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (product, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const userId = state.user.user_info.userId;

      const response = await axiosInstance.post(API_URL.CART, {
        userId,
        productId: product.productId,
        quantity: 1,
        price: product.price,
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

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const userId = state?.user?.user_info?.userId;

      const response = await axiosInstance.get(`${API_URL.CART}/${userId}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async ({ cartId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${API_URL.CART}/${cartId}`, { quantity });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${API_URL.CART}/${cartId}`);
      return { cartId };
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
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
        Swal.fire('Success', 'Product added to cart', 'success'); // Success alert
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        Swal.fire('Error', action.error.message, 'error'); // Error alert
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // Ensure this is an array
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        Swal.fire('Error', action.payload.message, 'error'); // Error alert
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        const { cartId, quantity } = action.payload;
        const existingItem = state.items.find(item => item.cartId === cartId);
        if (existingItem) {
          existingItem.quantity = quantity;
        }
        state.status = 'succeeded';
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        Swal.fire('Error', action.payload.message, 'error'); // Error alert
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        const { cartId } = action.payload;
        state.items = state.items.filter(item => item.cartId !== cartId);
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        Swal.fire('Error', action.payload.message, 'error'); // Error alert
      });
  },
});

export default cartSlice.reducer;
