import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogs, createBlog, updateBlog, deleteBlog } from '../../redux/slices/blogSlice';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

Modal.setAppElement("#root");

const AdminManageBlog = () => {
  const dispatch = useDispatch();
  const { blogs, status, error } = useSelector((state) => state.blogs);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ title: '', subject: '', description: '', date: '', image: null });
  const [editBlogId, setEditBlogId] = useState(null);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', formData.title);
    form.append('subject', formData.subject);
    form.append('description', formData.description);
    form.append('date', formData.date);
    form.append('image', formData.image);

    try {
      if (editMode) {
        await dispatch(updateBlog({ blogId: editBlogId, blogData: form }));
        Swal.fire('Success', 'Blog updated successfully!', 'success');
      } else {
        await dispatch(createBlog(form));
        Swal.fire('Success', 'Blog submitted successfully!', 'success');
      }
      setFormData({ title: '', subject: '', description: '', date: '', image: null });
      setEditMode(false);
      setEditBlogId(null);
      setModalOpen(false);
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  const handleEditClick = (blog) => {
    setFormData({ title: blog.title, subject: blog.subject, description: blog.description, date: blog.date, image: blog.image });
    setEditMode(true);
    setEditBlogId(blog.id);
    setModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await dispatch(deleteBlog(id));
      Swal.fire('Deleted!', 'Blog has been deleted.', 'success');
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-petBg p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Blogs</h1>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-orange-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Add Blog
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : blogs.length > 0 ? (
          blogs.map(blog => (
            <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">{blog.title}</h2>
              <p className="text-gray-700">{blog.description}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEditClick(blog)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(blog.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg font-bold">No blogs available</p>
        )}
      </div>

      <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} className="modal" overlayClassName="overlay">
        <h2 className="text-2xl font-bold mb-4">{editMode ? 'Edit Blog' : 'Add Blog'}</h2>
        <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Subject</label>
            <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full p-2 border rounded" required></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Image</label>
            <input type="file" name="image" onChange={handleFileChange} className="w-full p-2 border rounded" />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Save</button>
            <button type="button" onClick={() => setModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminManageBlog;
