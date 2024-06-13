import React from 'react';
import dogProfile from '../../assets/dog-profile.jpg'; 
import petListBanner from '../../assets/pet-list-banner.png';

export default function ViewPetList() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Banner */}
      <section 
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: `url(${petListBanner})`, height: '300px' }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold text-black">Pet List</h1>
          <h2 className="text-2xl text-black mt-4">Find your perfect pet companion</h2>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto flex px-12 py-12">
        {/* Sidebar */}
        <div className="w-1/4 pr-8">
          <h2 className="text-2xl font-bold mb-4">Filter</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Animal</h3>
            <ul>
              <li><input type="checkbox" /> Category 1</li>
              <li><input type="checkbox" /> Category 2</li>
              <li><input type="checkbox" /> Category 3</li>
            </ul>
            <h3 className="text-xl font-bold mt-4 mb-2">Breed</h3>
            <ul>
              <li><input type="checkbox" /> Category A</li>
              <li><input type="checkbox" /> Category B</li>
              <li><input type="checkbox" /> Category C</li>
            </ul>
          </div>
        </div>

        {/* Pet Cards */}
        <div className="w-3/4">
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              className="w-full p-4 rounded-lg shadow-md"
              placeholder="Search..."
            />
          </div>

          {/* Pet List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pet Card 1 */}
            <div className="bg-white rounded-lg shadow-md flex overflow-hidden">
              <img src={dogProfile} alt="Pet" className="w-1/3 h-full object-cover" />
              <div className="w-2/3 p-7">
                <h2 className="text-2xl font-bold py-2">Magdalene</h2>
                <p><strong>Gender:</strong> Female</p>
                <p><strong>Age:</strong> 2 years</p>
                <p><strong>Breed:</strong> Poodle Mix</p>
                <div className="mt-4 text-center">
                  <span className="text-blue-500">Special Needs</span>
                  <span className="ml-1 text-blue-500">Friendly to other pets</span>
                </div>
                <div className="mt-4 text-center">
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-full">More Info</button>
                </div>
              </div>
            </div>
            {/* Pet Card 2 */}
            <div className="bg-white rounded-lg shadow-md flex overflow-hidden">
              <img src={dogProfile} alt="Pet" className="w-1/3 h-full object-cover" />
              <div className="w-2/3 p-7">
                <h2 className="text-2xl font-bold py-2">Leelo</h2>
                <p><strong>Gender:</strong> Male</p>
                <p><strong>Age:</strong> 7 years</p>
                <p><strong>Breed:</strong> Mixed</p>
                <div className="mt-4 text-center">
                  <span className="text-blue-500">Vaccinated</span>
                  <span className="ml-2 text-blue-500">Friendly to other pets</span>
                </div>
                <div className="mt-4 text-center">
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-full">More Info</button>
                </div>
              </div>
            </div>
            {/* Pet Card 3 */}
            <div className="bg-white rounded-lg shadow-md flex overflow-hidden">
              <img src={dogProfile} alt="Pet" className="w-1/3 h-full object-cover" />
              <div className="w-2/3 p-7">
                <h2 className="text-2xl font-bold py-2">Leelo</h2>
                <p><strong>Gender:</strong> Male</p>
                <p><strong>Age:</strong> 7 years</p>
                <p><strong>Breed:</strong> Mixed</p>
                <div className="mt-4 text-center">
                  <span className="text-blue-500">Vaccinated</span>
                  <span className="ml-2 text-blue-500">Friendly to other pets</span>
                </div>
                <div className="mt-4 text-center">
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-full">More Info</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
