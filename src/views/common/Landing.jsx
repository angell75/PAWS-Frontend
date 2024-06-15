import React from 'react';
import { Link } from 'react-router-dom';
import landingBanner from '../../assets/test.png'; 
import vetImage from '../../assets/vaccination.png';
import petShopImage from '../../assets/Pet-shop.png'; 
import funActivitiesImage from '../../assets/pet-events.png'; 
import donationImage from '../../assets/donate.png'; 
import blogImage from '../../assets/blog.png'; 
import mission from '../../assets/mission.png';


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Hero Section */}
      <section className="bg-cover bg-center" style={{ backgroundImage: `url(${landingBanner})`, height: '670px' }}>
      <div className="container mx-auto h-full flex flex-col justify-center items-center">
          <div className="text-center text-amber-950">
            <h1 className="text-6xl font-serif font-bold">Welcome to PAWS!</h1>
            <p className="mt-4 font-serif text-6xl font-bold ">Find your new best friend</p>
            <p className="mt-4 font-serif text-lg font-bold">Browse pets from our network of over 1,000.</p>
          </div>
          <Link to="/viewpetlist" className="mt-8 inline-block px-10 py-3 bg-yellow-600 text-white text-2xl font-serif rounded-full shadow hover:bg-yellow-700">
            View Pets
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">OUR SERVICES!</h2>
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
        <div className="flex justify-center gap-8 mt-8">
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
      <section className="container mx-auto px-16 py-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">OUR MISSION</h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-1/2 px-6">
            <h3 className="text-2xl font-bold mb-4">Your pets deserve the best</h3>
            <p className="mb-4">We offer quick & easy services for cats and dogs, accumsan felis id, fermentum purus. Quisque vitae hendrerit elit.</p>
            <p className="mb-8">Aliquam erat volutpat In id fermentum augue, ut pellentesque leo. Maecenas at arcu risus. Donec commodo sodales ex, scelerisque laoreet nibh hendrerit id. In aliquet magna nec lobortis maximus. Etiam rhoncus leo a dolor placerat, nec elementum ipsum convallis.</p>
            <Link to="/contactus" className="inline-block px-6 py-3 bg-blue-700 text-white font-semibold rounded-md shadow hover:bg-orange-600">
              Contact Us
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img src={mission} alt="Mission" className="w-3/4 md:w-full" />
          </div>
        </div>
      </section>

      {/* Adoption Process Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">Pet Adoption Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <img src="https://via.placeholder.com/100" alt="Step 1" className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Find your pet</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="text-center">
              <img src="https://via.placeholder.com/100" alt="Step 2" className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Know your pet</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="text-center">
              <img src="https://via.placeholder.com/100" alt="Step 3" className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Take your pet home</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Pets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <img src="https://via.placeholder.com/300" alt="Charlie" className="mb-4 rounded" />
            <h3 className="text-xl font-bold mb-2">Charlie</h3>
            <p className="text-gray-600">Charlie is good on the lead and loves to go for walks.</p>
            <Link to="/details" className="text-indigo-500 hover:underline">Learn More</Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <img src="https://via.placeholder.com/300" alt="Denise" className="mb-4 rounded" />
            <h3 className="text-xl font-bold mb-2">Denise</h3>
            <p className="text-gray-600">Denise is one of the most loving dogs, she loves hugs.</p>
            <Link to="/details" className="text-indigo-500 hover:underline">Learn More</Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <img src="https://via.placeholder.com/300" alt="Rebecca" className="mb-4 rounded" />
            <h3 className="text-xl font-bold mb-2">Rebecca</h3>
            <p className="text-gray-600">Rebecca is very friendly and gets along with other animals.</p>
            <Link to="/details" className="text-indigo-500 hover:underline">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="text-lg font-bold">Tailwag</div>
            <div className="text-sm">© 2023 Tailwag. All rights reserved.</div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>Office: 123-456-7890</div>
            <div>Inquiries: 123-456-7890</div>
            <div>Mon - Fri: 8am - 8pm, Sat - Sun: Closed</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
