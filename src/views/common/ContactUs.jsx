import React from 'react';

export default function ContactUs() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-12 bg-gray-50">
      {/* Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg mb-4">
            Email, call, or complete the form to learn how Snappy can solve your messaging problem.
          </p>
          <p className="text-lg mb-4">
            info@snappy.io<br />
            321-221-231
          </p>
          <a href="#" className="text-blue-600 font-semibold">Customer Support</a>
          <div className="mt-8">
            <h3 className="text-xl font-bold">Customer Support</h3>
            <p className="text-gray-600 mb-4">
              Our support team is available around the clock to address any concerns or queries you may have.
            </p>
            <h3 className="text-xl font-bold">Feedback and Suggestions</h3>
            <p className="text-gray-600 mb-4">
              We value your feedback and are continuously working to improve Snappy. Your input is crucial in shaping the future of Snappy.
            </p>
            <h3 className="text-xl font-bold">Media Inquiries</h3>
            <p className="text-gray-600 mb-4">
              For media-related questions or press inquiries, please contact us at media@snappyapp.com.
            </p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-6">You can reach us anytime</p>
          <form>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="First name" className="p-4 border rounded-lg" />
              <input type="text" placeholder="Last name" className="p-4 border rounded-lg" />
            </div>
            <input type="email" placeholder="Your email" className="w-full p-4 mb-4 border rounded-lg" />
            <div className="flex items-center mb-4">
              <select className="p-4 border rounded-l-lg">
                <option>+62</option>
                {/* Add more country codes as needed */}
              </select>
              <input type="text" placeholder="Phone number" className="w-full p-4 border rounded-r-lg" />
            </div>
            <textarea placeholder="How can we help?" className="w-full p-4 mb-4 border rounded-lg h-32"></textarea>
            <button type="submit" className="w-full p-4 bg-blue-600 text-white font-bold rounded-lg">Submit</button>
            <p className="text-gray-600 text-center mt-4">
              By contacting us, you agree to our <a href="#" className="text-blue-600">Terms of service</a> and <a href="#" className="text-blue-600">Privacy Policy</a>
            </p>
          </form>
        </div>
      </div>
      
      {/* Map and Location Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345092344!2d144.95592331531674!3d-37.8172099797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1bce6b25e9!2s123%20Tech%20Boulevard%2C%20Suite%20456%2C%20San%20Francisco%2C%20CA%2012345%2C%20United%20States!5e0!3m2!1sen!2sus!4v1635298428321!5m2!1sen!2sus"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            className="border rounded-lg shadow-md"
          ></iframe>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Location</h2>
          <h3 className="text-2xl font-bold mb-2">Connecting Near and Far</h3>
          <p className="text-lg mb-4">
            Headquarters
          </p>
          <p className="text-gray-600 mb-4">
            Snappy Inc.<br />
            San Francisco, USA<br />
            123 Tech Boulevard, Suite 456<br />
            San Francisco, CA 12345<br />
            United States
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6">FAQ</h2>
        <h3 className="text-2xl font-bold mb-4">Do you have any questions for us?</h3>
        <p className="text-gray-600 mb-6">
          If there are questions you want to ask. We will answer all your question.
        </p>
        <form className="flex mb-12">
          <input type="text" placeholder="Enter your email" className="w-full p-4 border rounded-l-lg" />
          <button type="submit" className="p-4 bg-blue-600 text-white font-bold rounded-r-lg">Submit</button>
        </form>
        <div>
          <details className="mb-4">
            <summary className="font-bold text-lg">What makes Snappy different from other messaging apps?</summary>
            <p className="text-gray-600 mt-2">Snappy provides end-to-end encryption and unique features...</p>
          </details>
          <details className="mb-4">
            <summary className="font-bold text-lg">How secure are my conversations on Snappy?</summary>
            <p className="text-gray-600 mt-2">All conversations on Snappy are encrypted...</p>
          </details>
          <details className="mb-4">
            <summary className="font-bold text-lg">Can I personalize my Snappy experience?</summary>
            <p className="text-gray-600 mt-2">Yes, you can personalize your Snappy experience by...</p>
          </details>
          <details className="mb-4">
            <summary className="font-bold text-lg">What group features does Snappy offer?</summary>
            <p className="text-gray-600 mt-2">Snappy offers various group features including...</p>
          </details>
        </div>
      </div>
    </div>
  );
}
