// components/NovelDetail.js
import React from 'react';
import { FaBookOpen, FaHeart } from 'react-icons/fa';

const NovelDetail = ({ title, cover, genre, chapters, description }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-12 px-4 md:px-12">
      {/* Hero Section */}
      <div
        className="relative w-full h-96 bg-cover bg-center rounded-lg shadow-lg mb-12"
        style={{
          backgroundImage: `url(${cover})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex justify-center items-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold">{title}</h1>
        </div>
      </div>

      {/* Detail Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-8 md:flex">
        {/* Cover Image */}
        <div className="md:w-1/3 flex-shrink-0">
          <img
            src={cover}
            alt={`${title} cover`}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Novel Info */}
        <div className="mt-6 md:mt-0 md:ml-8 flex-1">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 text-sm mb-2">Genre: {genre}</p>
          <p className="text-gray-700 mb-4">{description}</p>

          {/* Chapter List */}
          <h3 className="text-2xl font-semibold mb-2">Chapters:</h3>
          <ul className="list-inside list-disc space-y-1 mb-6">
            {chapters.map((chapter, index) => (
              <li key={index} className="text-gray-800">
                {chapter}
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300 flex items-center space-x-2">
              <FaBookOpen />
              <span>Read More</span>
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition ease-in-out duration-300 flex items-center space-x-2">
              <FaHeart />
              <span>Favorite</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovelDetail;
