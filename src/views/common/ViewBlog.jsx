import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import articleImage from '../../assets/no-image.png'; 

export default function ViewBlog() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Recent Articles</h2>
        <p className="mt-4 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Article 1 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={articleImage} alt="Article 1" className="w-full h-58 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">How To Travel With Paper Map</h3>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
            </p>
            <a href="#" className="text-orange-500 font-bold">Read More</a>
          </div>
        </div>
        {/* Article 2 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={articleImage} alt="Article 2" className="w-full h-58 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Stay Always Hydrated While Travelling</h3>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
            </p>
            <a href="#" className="text-orange-500 font-bold">Read More</a>
          </div>
        </div>
        {/* Article 3 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={articleImage} alt="Article 3" className="w-full h-58 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Things You Need In Your Bag Before Travelling</h3>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
            </p>
            <a href="#" className="text-orange-500 font-bold">Read More</a>
          </div>
        </div>
      </div>
    </div>
  );
}
