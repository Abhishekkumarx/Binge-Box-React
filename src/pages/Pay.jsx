import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Pay = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // from .env
      amount: 10000,
      currency: "INR",
      name: "Binge Box",
      description: "Access Contact Us Page",
      handler: function (response) {
        localStorage.setItem("paid", "true");

        navigate("/contact");
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl mb-4 font-bold">Complete Payment</h1>
      <p className="mb-6 text-gray-300">You must pay ₹500 to access Contact Us page.</p>

      <button
        onClick={handlePayment}
        className="px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Pay;
