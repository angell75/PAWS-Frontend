import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeDonation, clearError } from "../../redux/slices/donationSlice";
import feedStrays from "../../assets/feed-strays.jpg";
import treatment from "../../assets/treatment.jpg";
import vaccinate from "../../assets/vaccination.jpg";

export default function UserDonate() {
  const [donationAmount, setDonationAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.donations);

  const handleDonate = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      makeDonation({ amount: donationAmount })
    ).unwrap();
    if (result) {
      setSuccessMessage(`Thank you for your donation of $${result.amount}!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Banner */}
      <section className="bg-gray-900 text-gray-300 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold text-title">Donate</h1>
          <h2 className="text-2xl text-white mt-4">Your support helps us save more lives</h2>
        </div>
      </section>

      {/* Donation Funding Section */}
      <section className="container mx-auto px-16 py-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Funding</h2>
          <p className="mt-4 text-gray-600">
            Help us by supporting our various initiatives. Your contributions
            make a big difference!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-4">
            <div className="flex items-center justify-center w-full h-80 mb-4">
              <img
                src={feedStrays}
                alt="Feed Strays"
                className="max-w-full max-h-full"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">Feed Strays</h3>
            <p className="text-gray-600">
              We travel to more than 10 spots around Setia Alam every night to
              feed the stray animals.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="flex items-center justify-center w-full h-80 mb-4">
              <img
                src={treatment}
                alt="Treatment"
                className="max-w-full max-h-full"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">Treatment</h3>
            <p className="text-gray-600">
              We seek treatment for animals that require medical attention, ie.
              injuries, diseases, abuse.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="flex items-center justify-center w-full h-80 mb-4">
              <img
                src={vaccinate}
                alt="Vaccinate"
                className="max-w-full max-h-full"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">Vaccinate</h3>
            <p className="text-gray-600">
              Vaccinations are to ensure that our animals are protected from
              transmissible diseases.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="container mx-auto px-16 py-20 bg-gray-900">
        <div className="flex justify-center">
          <div className="w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-3xl font-bold mb-4 text-center">Be a Donor</h2>
            <form onSubmit={handleDonate}>
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">
                  Donation Amount *
                </label>
                <select
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="w-full p-2 border rounded-md input-focused"
                >
                  <option value="">Select an amount</option>
                  <option value="20">$20</option>
                  <option value="50">$50</option>
                  <option value="100">$100</option>
                  <option value="200">$200</option>
                </select>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-md shadow hover:bg-blue-700"
                >
                  Donate
                </button>
              </div>
            </form>
            {status === "failed" && error && (
              <div className="mt-4 text-center text-red-500 font-bold">
                {error.message || error}
              </div>
            )}
            {status === "succeeded" && successMessage && (
              <div className="mt-4 text-center text-green-500 font-bold">
                {successMessage}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
