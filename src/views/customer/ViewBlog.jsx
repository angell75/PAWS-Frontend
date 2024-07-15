import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBlogs, createBlog, updateBlog, deleteBlog } from "../../redux/slices/blogSlice";
import articleImage from "../../assets/no-image.png";
import Swal from "sweetalert2";
import blogBanner from "../../assets/blog-bg.png";

export default function ViewBlog() {
  const dispatch = useDispatch();
  const { blogs = [], status, error } = useSelector((state) => state.blogs);
  const { user } = useSelector((state) => state.auth);
  const userId = user?.userId;
  const [formData, setFormData] = useState({ title: '', subject: '', description: '', date: '', image: null });
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [formError, setFormError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const publicBlogs = blogs.filter(blog => blog.shelterId !== userId);
  const userBlogs = blogs.filter(blog => blog.shelterId === userId);

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
    form.append('shelterId', userId);

    try {
      await dispatch(createBlog(form)).unwrap();
      setFormData({ title: '', subject: '', description: '', date: '', image: null });
      setModalOpen(false);
      setFormError(null);
    } catch (err) {
      setFormError(err);
    }
  };

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      subject: blog.subject,
      description: blog.description,
      date: blog.date.split("T")[0],
      image: null,
    });
    setEditModalOpen(true);
  };

  const handleEditBlog = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append('title', formData.title);
    updatedData.append('subject', formData.subject);
    updatedData.append('description', formData.description);
    updatedData.append('date', formData.date);
    if (formData.image) {
      updatedData.append('image', formData.image);
    }
    updatedData.append('shelterId', userId);

    try {
      await dispatch(updateBlog({ blogId: selectedBlog.blogId, updatedData })).unwrap();
      setEditModalOpen(false);
      setFormError(null);
    } catch (err) {
      setFormError(err);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this pet!',
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
            Swal.fire('Error!', 'There was an error deleting the pet.', 'error');
          }
        });
      }
    });
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
        <div className="flex flex-row">
          {status === 'loading' ? (
            <p>Loading...</p>
          ) : error ? (
            <></>
          ) : publicBlogs?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-3/4">
              {publicBlogs?.map((blog) => (
                <div key={blog?.blogId} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={blog?.image || articleImage} alt={blog?.title || 'Blog Image'} className="w-full h-58 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{blog?.title || 'No Title'}</h3>
                    <p className="text-gray-600 mb-4 truncate">{blog?.description || 'No Description'}</p>
                    <Link
                      to={`/customer/viewblogdetails/${blog.blogId}`}
                      className="text-orange-500 font-bold"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-xl font-bold w-3/4">No blogs available</p>
          )}
          <div className="w-full md:w-1/4 md:pl-8 mt-10 md:mt-0 w-1/4">
            <h2 className="text-2xl font-bold mb-4">Manage My Blogs</h2>
            {userBlogs.length > 0 ? (
              userBlogs.map((blog) => (
                <div key={blog.blogId} className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                  <button 
                    onClick={() => handleEditClick(blog)} 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteBlog(blog.blogId)} 
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-xl font-bold w-1/4">No blogs to manage</p>
            )}
          </div>
        </div>
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
        {editModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
              <div className="flex justify-end">
                <button onClick={() => setEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">&times;</button>
              </div>
              <h2 className="text-3xl font-bold mb-4">Edit Blog</h2>
              {formError && <p className="text-red-500 mb-4">{JSON.stringify(formError)}</p>}
              <form onSubmit={handleEditBlog}>
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
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Update</button>
                  <button onClick={() => setEditModalOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded-md">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
