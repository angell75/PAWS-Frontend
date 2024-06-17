import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import landingBanner from '../../assets/test.png'; 
import vetImage from '../../assets/vaccination.png';
import petShopImage from '../../assets/Pet-shop.png'; 
import funActivitiesImage from '../../assets/pet-events.png'; 
import donationImage from '../../assets/donate.png'; 
import blogImage from '../../assets/blog.png'; 
import mission from '../../assets/mission.png';
import { useSelector } from 'react-redux';
import noImage from '../../assets/no-image.png';
import findPet from '../../assets/find-pet.jpg';
import knowPet from '../../assets/know-pet.jpg';
import takeHome from '../../assets/take-home.jpg';
import adoptionProcessBanner from '../../assets/paws22.png'; 

export default function LandingPage() {
  const [featuredPets, setFeaturedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchFeaturedPets = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/top-pets', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFeaturedPets(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchFeaturedPets();
  }, [token]);

  return (
    <div className="min-h-screen bg-customBg flex flex-col">
      {/* Hero Section */}
      <section className="bg-cover bg-center" style={{ backgroundImage: `url(${landingBanner})`, height: '670px' }}>
        <div className="container mx-auto h-full flex flex-col justify-center items-center">
          <div className="text-center text-amber-950">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold">Welcome to PAWS!</h1>
            <p className="mt-4 text-lg sm:text-xl md:text-2xl font-serif font-bold">Find your new best friend</p>
            <p className="mt-4 text-base sm:text-lg md:text-xl font-serif font-bold">Browse pets from our network of over 1,000.</p>
          </div>
          <Link to="/viewpetlist" className="mt-8 inline-block px-6 py-3 sm:px-10 sm:py-4 bg-yellow-600 text-white text-lg sm:text-2xl font-serif rounded-full shadow hover:bg-yellow-700">
            View Pets
          </Link>
        </div>
      </section>

      {/* Service Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold uppercase">Our Services</h2>
          <p className="mt-4 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
            <img src={vetImage} alt="Veterinary 24/7" className="mb-4 h-40" />
            <h3 className="text-xl font-bold mb-2 text-orange-500">Veterinary 24/7</h3>
            <p className="text-gray-600 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
            <img src={petShopImage} alt="Pet Shop" className="mb-4 h-40" />
            <h3 className="text-xl font-bold mb-2 text-orange-500">Pet Shop</h3>
            <p className="text-gray-600 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
            <img src={funActivitiesImage} alt="Fun Activities" className="mb-4 h-40" />
            <h3 className="text-xl font-bold mb-2 text-orange-500">Fun Activities</h3>
            <p className="text-gray-600 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
            <img src={donationImage} alt="Donation" className="mb-4 h-40" />
            <h3 className="text-xl font-bold mb-2 text-orange-500">Donation</h3>
            <p className="text-gray-600 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
            <img src={blogImage} alt="Blog" className="mb-4 h-40" />
            <h3 className="text-xl font-bold mb-2 text-orange-500">Blog</h3>
            <p className="text-gray-600 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="bg-customBg container mx-auto px-6 md:px-16 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold uppercase">Our Mission</h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-1/2 px-6">
            <h3 className="text-2xl font-bold mb-4">Your pets deserve the best</h3>
            <p className="text-lg mb-4">We offer quick & easy services for cats and dogs, accumsan felis id, fermentum purus. Quisque vitae hendrerit elit.</p>
            <p className="text-lg mb-8">Aliquam erat volutpat In id fermentum augue, ut pellentesque leo. Maecenas at arcu risus. Donec commodo sodales ex, scelerisque laoreet nibh hendrerit id. In aliquet magna nec lobortis maximus. Etiam rhoncus leo a dolor placerat, nec elementum ipsum convallis.</p>
            <Link to="/contactus" className="inline-block px-6 py-3 bg-blue-700 text-white font-semibold rounded-md shadow hover:bg-orange-600">
              Contact Us
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
            <img src={mission} alt="Mission" className="w-full max-w-xs md:max-w-full" />
          </div>
        </div>
      </section>

      {/* Adoption Process Section */}
      <section className="bg-cover bg-center">
        <div className="container mx-auto px-6 md:px-16 py-20 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold uppercase">Pet Adoption Process</h2>
            <p className="mt-4 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            <div className="p-10 rounded-lg flex flex-col items-center">
              <img src={findPet} alt="Find your pet" className="w-32 sm:w-48 md:w-64 h-auto rounded mb-4" />
              <h3 className="text-xl font-bold mb-2">Find your pet</h3>
              <p className="text-gray-600 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="p-10 rounded-lg flex flex-col items-center">
              <img src={knowPet} alt="Know your pet" className="w-32 sm:w-48 md:w-64 h-auto rounded mb-4" />
              <h3 className="text-xl font-bold mb-2">Know your pet</h3>
              <p className="text-gray-600 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="p-10 rounded-lg flex flex-col items-center">
              <img src={takeHome} alt="Take your pet home" className="w-32 sm:w-48 md:w-64 h-auto rounded mb-4" />
              <h3 className="text-xl font-bold mb-2">Take your pet home</h3>
              <p className="text-gray-600 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section className="bg-customBg container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold uppercase">Featured Pets</h2>
          <p className="mt-4 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error.message}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {featuredPets?.map((pet) => (
              <div key={pet.id} className="bg-white p-4 sm:p-6 rounded-lg shadow">
                <div className="flex justify-center items-center h-48 sm:h-64 mb-12 mt-12">
                  <img
                    src={pet.petImage}
                    alt={pet.name}
                    className="w-64 sm:w-70 h-70 pt-5 aspect-square rounded"
                    onError={(e) => { e.target.src = noImage; }}
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-center">{pet.name}</h3>
                <p className="text-gray-600 text-center text-sm sm:text-base">{pet.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-lg font-bold">PAWS</div>
            <div className="text-sm">© 2023 Paws. All rights reserved.</div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-4">
            <div>Office: 123-456-7890</div>
            <div>Inquiries: 123-456-7890</div>
            <div>Mon - Fri: 8am - 8pm, Sat - Sun: Closed</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
