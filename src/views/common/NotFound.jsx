import React from 'react';
import notFoundImage from '../../assets/404.png'; // Adjust the path based on your directory structure

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center" style={{ userSelect: 'none', cursor: 'default' }}>
      <img
        src={notFoundImage}
        alt="404 Not Found"
        className="w-1/2 h-auto"
        style={{ 
          userSelect: 'none', 
          pointerEvents: 'none',
          cursor: 'default'
        }}
      />
    </div>
  );
}
