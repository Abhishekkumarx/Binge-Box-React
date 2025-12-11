
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Pay = () => {

  const navigate = useNavigate();
  

  const handlePayment = () => {
      const razorPayKey = import.meta.env.VITE_RAZORPAY_KEY;

      const options = {
          key: razorPayKey,
          amount: 10000,
          currency: 'INR',
          name: 'Contact Page Access',
          description: 'Payment to unlock Contact page',
          handler: function (response) {
              sessionStorage.setItem("contact_paid", "true");
              navigate("/contactus");
          },
          theme: {
              color: '#e50914',
          },
      }

      const razorPay = new window.Razorpay(options);
      razorPay.open()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      
      {/* Glass card */}
      <div className="bg-[#121212] border border-red-600/50 rounded-2xl p-10 max-w-md w-full text-center shadow-[0_0_25px_rgba(255,0,0,0.3)]">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-red-500">
          Unlock Contact Page
        </h1>

        <p className="text-gray-300 mt-4 text-lg">
          Pay <span className="text-red-500 font-semibold">₹100</span> to get access.
        </p>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          className="mt-8 w-full bg-red-600 hover:bg-red-700 cursor-pointer text-white font-semibold py-3 rounded-xl text-lg tracking-wide transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-600/40"
        >
          Pay ₹100
        </button>

        {/* Security Note */}
        <p className="text-xs text-gray-500 mt-4">
          Secure payment powered by Razorpay (Test Mode)
        </p>

      </div>
    </div>
  )
}

export default Pay
