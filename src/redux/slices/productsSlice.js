import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';
import { API_URL } from '../../statis/url';

// Fetch products for the seller
export const fetchSellerProducts = createAsyncThunk(
  'products/fetchSellerProducts',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const userId = state.user.user_info.userId;
      const userRole = state.user.user_info.userRole;

      if (userRole !== 'seller') {
        throw new Error('Unauthorized');
      }

      const response = await axiosInstance.get(`${API_URL.PRODUCTS}?sellerId=${userId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Add a new product
export const addProduct = createAsyncThunk('products/addProduct', async (productData) => {
  const response = await axiosInstance.post(API_URL.PRODUCTS, productData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
});

// Update an existing product
export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, formData }) => {
  const response = await axiosInstance.post(`${API_URL.PRODUCTS}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
});



// Delete a product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
  await axiosInstance.delete(`${API_URL.PRODUCTS}/${productId}`);
  return productId;
});

// Create a slice for products
const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(product => product.productId === action.payload.productId);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.productId !== action.payload);
      });
  },
});

export default productSlice.reducer;
