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
                      What makes Snappy different from other messaging apps?
                    </summary>
                    <p className="mt-2">
                      Snappy offers unique features like XYZ which differentiate it from other messaging apps.
                    </p>
                  </details>
                </li>
                <li>
                  <details className="bg-amber-100 p-4 rounded-md">
                    <summary className="font-semibold cursor-pointer">
                      How secure are my conversations on Snappy?
                    </summary>
                    <p className="mt-2">
                      Snappy uses end-to-end encryption to ensure that your conversations are secure.
                    </p>
                  </details>
                </li>
                <li>
                  <details className="bg-amber-100 p-4 rounded-md">
                    <summary className="font-semibold cursor-pointer">
                      Can I personalize my Snappy experience?
                    </summary>
                    <p className="mt-2">
                      Yes, Snappy allows you to personalize your experience with various customization options.
                    </p>
                  </details>
                </li>
                <li>
                  <details className="bg-amber-100 p-4 rounded-md">
                    <summary className="font-semibold cursor-pointer">
                      What group features does Snappy offer?
                    </summary>
                    <p className="mt-2">
                      Snappy offers group features like ABC which make group communication easy and efficient.
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
