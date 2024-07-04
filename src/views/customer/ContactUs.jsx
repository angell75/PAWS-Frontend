import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import contactUsBanner from "../../assets/contact-us.jpg";
import faqBanner from "../../assets/faq-ban.jpg"; 
import { submitEnquiry } from "../../redux/slices/enquiriesSlice";

export default function ContactUs() {
  const dispatch = useDispatch();
  const [enquiryData, setEnquiryData] = useState({
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnquiryData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(enquiryData);
      const result = await dispatch(submitEnquiry(enquiryData));
      if (result.type === 'enquiries/submitEnquiry/fulfilled') {
        Swal.fire({
          icon: "success",
          title: "Message Sent",
          text: "Thank you for reaching out to us. We will get back to you soon.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: result?.payload?.message,
        });
      }
    } catch (error) {
      console.warn(error)
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an issue sending your message. Please try again.",
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Banner */}
      <section
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: `url(${contactUsBanner})`, height: "300px" }}
      >
        <div className="container mx-auto text-left pl-64">
          <h1 className="text-4xl md:text-6xl font-bold text-black">Contact Us</h1>
          <h2 className="text-xl md:text-2xl text-black mt-4">
            We’d love to hear from you!
          </h2>
        </div>
      </section>

      {/* Contact Form */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-petBg">
        <div className="max-w-3xl mx-auto glass-container p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-5 text-center">Send us a message</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={enquiryData.message}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md border-slate-950"
                rows="5"
                required
              ></textarea>
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-md shadow hover:bg-blue-700"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ Banner Section */}
      <section className="bg-cover bg-center" style={{ backgroundImage: `url(${faqBanner})`, height: '250px' }}>
        <div className="container mx-auto h-full flex flex-col justify-center items-center sm:px-6 lg:px-8">
          <h2 className="text-5xl text-white font-bold mb-5 text-center">FAQ</h2>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-petBg py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full">
              <ul className="space-y-4">
                <li>
                  <details className="bg-amber-100 p-4 rounded-md">
                    <summary className="font-semibold cursor-pointer">
                      How can I adopt a pet through PAWS?
                    </summary>
                    <p className="mt-2">
                      You can browse available pets on our platform, get to know their profiles, and follow our easy adoption process to take your new pet home.
                    </p>
                  </details>
                </li>
                <li>
                  <details className="bg-amber-100 p-4 rounded-md">
                    <summary className="font-semibold cursor-pointer">
                      What types of pets can I find on PAWS?
                    </summary>
                    <p className="mt-2">
                      PAWS features a wide variety of pets including dogs, cats, and other small animals from shelters and rescues across the country.
                    </p>
                  </details>
                </li>
                <li>
                  <details className="bg-amber-100 p-4 rounded-md">
                    <summary className="font-semibold cursor-pointer">
                      How secure is the adoption process on PAWS?
                    </summary>
                    <p className="mt-2">
                      The adoption process on PAWS is secure and thorough, ensuring that all adoptions are legitimate and that pets are going to loving, suitable homes.
                    </p>
                  </details>
                </li>
                <li>
                  <details className="bg-amber-100 p-4 rounded-md">
                    <summary className="font-semibold cursor-pointer">
                      Can I volunteer or donate to PAWS?
                    </summary>
                    <p className="mt-2">
                      Yes, PAWS offers opportunities for volunteering and accepting donations to support our mission of improving pet welfare and facilitating adoptions.
                    </p>
                  </details>
                </li>
                <li>
                  <details className="bg-amber-100 p-4 rounded-md">
                    <summary className="font-semibold cursor-pointer">
                      Does PAWS offer any additional services?
                    </summary>
                    <p className="mt-2">
                      Yes, PAWS provides services such as 24/7 veterinary support, pet shops, fun activities for pets and owners, and a regularly updated blog with helpful tips and stories.
                    </p>
                  </details>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
