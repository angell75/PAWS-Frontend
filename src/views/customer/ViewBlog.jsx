import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, createBlog, updateBlog, deleteBlog } from "../../redux/slices/blogSlice";
import articleImage from "../../assets/no-image.png";
import blogBanner from "../../assets/blog-bg.png";

export default function ViewBlog() {
  const dispatch = useDispatch();
  const { blogs = [], status, error } = useSelector((state) => state.blogs);
  const { user } = useSelector((state) => state.auth); // Ensure you get the user from auth state
  const userId = user?.id; // Access userId from the user object
  const [formData, setFormData] = useState({ title: '', subject: '', description: '', date: '', image: null });
  const [modalOpen, setModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [formError, setFormError] = useState(null);

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
    if (!userId) {
      setFormError("User is not authenticated.");
      return;
    }

    const form = new FormData();
    form.append('title', formData.title);
    form.append('subject', formData.subject);
    form.append('description', formData.description);
    form.append('date', formData.date);
    form.append('image', formData.image);
    form.append('shelterId', userId); // Add the userId as shelterId

    try {
      await dispatch(createBlog(form)).unwrap();
      setFormData({ title: '', subject: '', description: '', date: '', image: null });
      setModalOpen(false);
      setFormError(null);
    } catch (err) {
      setFormError(err);
    }
  };

  const handleEditBlog = async (blogId, updatedData) => {
    try {
      await dispatch(updateBlog({ blogId, updatedData })).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await dispatch(deleteBlog(blogId)).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <section className="bg-cover bg-center py-20" style={{ backgroundImage: `url(${blogBanner})`, height: "300px" }}>
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold text-black">Blog</h1>
          <h2 className="text-2xl text-black mt-4">Stay updated with our latest stories and tips</h2>
        </div>
      </section>
      <div className="container mx-auto px-10 py-10">
        <div className="mb-10 flex flex-col md:flex-row justify-between">
          <input
            type="text"
            className="w-full md:w-5/6 p-4 rounded-lg shadow-md mb-4 md:mb-0"
            placeholder="Search Blog Title or Subject"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <button
            onClick={() => setModalOpen(true)}
            className="w-full md:w-1/6 ml-0 md:ml-4 px-4 py-2 bg-orange-600 text-white font-semibold rounded-md shadow hover:bg-orange-700"
          >
            Add Blog
          </button>
        </div>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error.message || error}</p>
        ) : blogs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs?.map((blog) => (
              <div key={blog?.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={blog?.image || articleImage} alt={blog?.title || 'Blog Image'} className="w-full h-58 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{blog?.title || 'No Title'}</h3>
                  <p className="text-gray-600 mb-4">{blog?.description || 'No Description'}</p>
                  <a href="#" className="text-orange-500 font-bold">Read More</a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl font-bold">No blogs available</p>
        )}
        {modalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
              <div className="flex justify-end">
                <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-700">&times;</button>
              </div>
              <h2 className="text-3xl font-bold mb-4">Submit a New Blog</h2>
              {formError && <p className="text-red-500 mb-4">{formError.message || formError}</p>}
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block text-lg font-semibold mb-2">Title</label>
                  <input type="text" name="title" value={formData?.title} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-semibold mb-2">Subject</label>
                  <input type="text" name="subject" value={formData?.subject} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-semibold mb-2">Description</label>
                  <textarea name="description" value={formData?.description} onChange={handleInputChange} className="w-full p-2 border rounded" required></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-semibold mb-2">Date</label>
                  <input type="date" name="date" value={formData?.date} onChange={handleInputChange} className="w-full p-2 border rounded" required />
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
          </div>
        )}
      </div>
    </div>
  );
}
