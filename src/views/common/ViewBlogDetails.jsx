import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import articleImage from "../../assets/no-image.png";
import blogBanner from "../../assets/blog-bg.png";

export default function ViewBlogDetails() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const { blogs } = useSelector((state) => state.blogs);
  const blog = blogs.find((b) => b.blogId === parseInt(blogId, 10));

  if (!blog) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <section className="bg-cover bg-center py-20" style={{ backgroundImage: `url(${blogBanner})`, height: "300px" }}>
          <div className="container mx-auto text-center">
            <h1 className="text-6xl font-bold text-black">Blog</h1>
            <h2 className="text-2xl text-black mt-4">Stay updated with our latest stories and tips</h2>
          </div>
        </section>
        <div className="container mx-auto px-10 py-10 text-center">
          <h2 className="text-4xl font-bold mb-6">Blog Post Not Found</h2>
          <Link to="/" className="text-blue-500 font-bold">Go back to the blog list</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <section className="bg-cover bg-center py-20" style={{ backgroundImage: `url(${blogBanner})`, height: "300px" }}>
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold text-black">Blog</h1>
          <h2 className="text-2xl text-black mt-4">Stay updated with our latest stories and tips</h2>
        </div>
      </section>
      <div className="container mx-auto px-10 py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="my-2 ml-5 text-left">
            <button onClick={() => navigate(-1)} className="text-blue-500 font-bold">Back to Previous Page</button>
          </div>
          <img src={blog.image || articleImage} alt={blog.title || 'Blog Image'} className="w-full h-80 object-cover" />
          <div className="p-6">
            <h2 className="text-4xl font-bold mb-4">{blog.title}</h2>
            <p className="text-xl text-gray-700 mb-4">{blog.subject}</p>
            <p className="text-gray-600 mb-4">{blog.description}</p>
            <p className="text-gray-500">{new Date(blog.date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
