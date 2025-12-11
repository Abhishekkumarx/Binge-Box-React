import React, { useEffect } from 'react';

function ContactUs() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-black text-white min-h-screen w-full flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-red-600 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-300">
            Have a question, feedback, or a suggestion? We'd love to hear from you.
          </p>
        </div>

        <form className="mt-12 bg-[#121212] p-8 rounded-2xl shadow-lg space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-400 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-[#1e1e1e] border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-3"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-400 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-[#1e1e1e] border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-3"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-400 mb-2">
              Your Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="6"
              className="bg-[#1e1e1e] border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-3"
              placeholder="Let us know what's on your mind..."
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;