import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import articleImage from "../../assets/no-image.png";
import blogBanner from "../../assets/blog-bg.png";

export default function ViewBlog() {
  return (
    <div
      className="bg-white min-h-screen flex flex-col">
      <section
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: `url(${blogBanner})`, height: "300px" }}>
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold text-black">Blog</h1>
          <h2 className="text-2xl text-black mt-4">
            Stay updated with our latest stories and tips
          </h2>
        </div>
      </section>
      <div className="px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Article 1 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={articleImage}
            alt="Article 1"
            className="w-full h-58 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">
              How To Travel With Paper Map
            </h3>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
            <a href="#" className="text-orange-500 font-bold">
              Read More
            </a>
          </div>
        </div>
        {/* Article 2 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={articleImage}
            alt="Article 2"
            className="w-full h-58 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">
              Stay Always Hydrated While Travelling
            </h3>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
            <a href="#" className="text-orange-500 font-bold">
              Read More
            </a>
          </div>
        </div>
        {/* Article 3 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={articleImage}
            alt="Article 3"
            className="w-full h-58 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">
              Things You Need In Your Bag Before Travelling
            </h3>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
            <a href="#" className="text-orange-500 font-bold">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
