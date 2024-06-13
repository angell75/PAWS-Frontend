import React from 'react';
import { Link } from 'react-router-dom';
import dogProfileImage from '../../assets/dog-profile.jpg';

export default function ViewPetDetail() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-12 bg-[#DCCCBB]">
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row mb-12 p-6">
        <div className="w-full md:w-1/4 p-4">
          <img src={dogProfileImage} alt="Magdalene" className="w-full h-auto rounded-lg shadow-md" />
        </div>
        <div className="w-full md:w-2/3 p-6 md:pl-10">
          <h1 className="text-4xl font-bold mb-4">Meet Magdalene</h1>
          <p className="text-lg mb-2"><strong>Gender:</strong> Female</p>
          <p className="text-lg mb-2"><strong>Age:</strong> 2 years</p>
          <p className="text-lg mb-2"><strong>Breed:</strong> Poodle Mix</p>
          <div className="flex items-center mt-4">
            <span className="text-blue-500 mr-4">Special Needs Pet</span>
            <span className="text-blue-500">Friendly to Other Animals</span>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-bold mb-10">About Me</h2>
        <p className="text-gray-700 mb-4">
          Aliquam erat volutpat. In id fermentum augue, ut pellentesque leo. Maecenas at arcu risus.
          Donec commodo sodales ex, scelerisque laoreet nibh hendrerit id. In aliquet magna nec lobortis maximus.
          Etiam rhoncus leo a dolor placerat, nec elementum ipsum convall.
        </p>
        <p className="text-gray-700 mb-4">
          Etiam rhoncus leo a dolor placerat, nec elementum ipsum convall. Maecenas at arcu risus scelerisque laoree.
        </p>
        <p className="text-gray-700 font-bold">
          If you have any doubts or need more information, please <Link to="/contact" className="text-blue-500 underline">contact us</Link>.
        </p>
        <div className="py-4 text-center">
        <Link to="/adoptionapplication" className="bg-orange-600 text-white py-3 px-6 rounded-full shadow hover:bg-orange-700 text-lg font-bold">
          Adopt Me
        </Link>
      </div>
      </div>


    </div>
  );
}
