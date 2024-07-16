import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs, createBlog, deleteBlog } from '../../redux/slices/blogSlice';
import articleImage from '../../assets/no-image.png';
import Swal from 'sweetalert2';
import blogBanner from '../../assets/blog-bg.png';
import Modal from 'react-modal';

Modal.setAppElement("#root");

const PAGE_SIZE = 9;

export default function AdminManageBlog() {
  const dispatch = useDispatch();
  const { blogs = [], status, error } = useSelector((state) => state.blogs);
  const { user } = useSelector((state) => state.auth);
  const userId = user?.userId;
  const [modalOpen, setModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [formData, setFormData] = useState({ title: '', subject: '', description: '', date: '', image: null });
  const [formError, setFormError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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
    form.append('shelterId', userId);

    try {
      await dispatch(createBlog(form)).unwrap();
      Swal.fire('Success', 'Blog submitted successfully!', 'success');
      setFormData({ title: '', subject: '', description: '', date: '', image: null });
      setModalOpen(false);
      setFormError(null);
      dispatch(fetchBlogs());
    } catch (err) {
      setFormError(err.message || err.toString());
    }
  };

  const handleDeleteBlog = async (blogId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this blog!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBlog(blogId)).then((action) => {
          if (action.meta.requestStatus === 'fulfilled') {
            Swal.fire('Deleted!', 'The blog has been deleted.', 'success');
            dispatch(fetchBlogs());
          } else {
            Swal.fire('Error!', 'There was an error deleting the blog.', 'error');
          }
        });
      }
    });
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchInput.toLowerCase()) ||
    blog.subject.toLowerCase().includes(searchInput.toLowerCase())
  );

  const paginatedBlogs = filteredBlogs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const totalPages = Math.ceil(filteredBlogs.length / PAGE_SIZE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <section className="bg-cover bg-center py-20" style={{ backgroundImage: `url(${blogBanner})`, height: "200px" }}>
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold text-black">Manage Blogs</h1>
        </div>
      </section>
      <div className="container mx-auto px-10 py-10">
        <div className="mb-10 flex flex-col md:flex-row justify-between">
          <input
            type="text"
            className="w-full p-4 rounded-lg shadow-md mb-4 md:mb-0"
            placeholder="Search Blog Title or Subject"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {status === 'loading' ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">An error occur</p>
          ) : paginatedBlogs.length > 0 ? (
            paginatedBlogs.map((blog) => (
              <div key={blog.blogId} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={blog.image || articleImage} alt={blog.title || 'Blog Image'} className="w-full h-58 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{blog.title || 'No Title'}</h3>
                  <p className="text-gray-600 mb-4 truncate">{blog.description || 'No Description'}</p>
                  <Link
                    to={`/admin/viewblogdetails/${blog.blogId}`}
                    className="text-orange-500 font-bold"
                  >
                    Read More
                  </Link>
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={() => handleDeleteBlog(blog.blogId)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-xl font-bold w-full">No blogs available</p>
          )}
        </div>

        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-2 rounded-md ${currentPage === index + 1 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {modalOpen && (
          <Modal
            isOpen={modalOpen}
            onRequestClose={() => setModalOpen(false)}
            className="modal"
            overlayClassName="overlay"
          >
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-end">
                <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-700">&times;</button>
              </div>
              <h2 className="text-3xl font-bold mb-4">Submit a New Blog</h2>
              {formError && <p className="text-red-500 mb-4">{formError}</p>}
              <form onSubmit={handleFormSubmit}>
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
                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Submit</button>
                  <button onClick={() => setModalOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded-md">Cancel</button>
                </div>
              </form>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
