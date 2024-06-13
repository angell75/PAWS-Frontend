import React from 'react';
import donateBanner from '../../assets/donate-banner.png';
import card from '../../assets/information-card.png';



export default function UserDonate() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Banner */}
      <section 
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: `url(${donateBanner})`, height: '300px' }}
      >
        <div className="container mx-auto text-center">
        <h1 className="text-6xl font-bold text-title">Donate</h1>
          <p className="text-black mt-4">Thank you for your support of our furry friends!</p>
        </div>
      </section>

      {/* Donate */}
      <section className="container mx-auto px-16 py-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">DONATE & HELP OUR FURRY FRIEND NOW</h2>
          <p className="mt-4 text-gray-600">You can make a donation through the following channels:-</p>
        </div>
        <div className="flex flex-col md:flex-row py-16 items-center">
          <div className="md:w-1/2 flex justify-center">
            <img src={card} alt="Card" className="w-2/4 md:w-50" />
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src={card} alt="Card" className="w-2/4 md:w-50" />
          </div>
        </div>
      </section>

      {/* Donation Wishlist Section */}
      <section className="container mx-auto px-20 py-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Wishlist</h2>
          <p className="mt-4 text-gray-600">Help us by donating items from our wishlist. Your contributions make a big difference!</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b bg-gray-100 text-left">Item</th>
                <th className="py-2 px-4 border-b bg-gray-100 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 11 }).map((_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">Item {index + 1}</td>
                  <td className="py-2 px-4 border-b">Description for Item {index + 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
