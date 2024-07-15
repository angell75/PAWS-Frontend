import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';
import { API_URL } from '../../statis/url';

// Fetch blogs
export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_URL.BLOGS}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create blog
export const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${API_URL.BLOGS}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update blog
export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async ({ blogId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${API_URL.BLOGS}/${blogId}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete blog
export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`${API_URL.BLOGS}/${blogId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createBlog.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateBlog.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.blogs.findIndex((blog) => blog.id === action.payload.id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload.id);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
