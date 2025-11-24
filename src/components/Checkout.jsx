// import React from "react";

// const Checkout = () => {
//      return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 text-center">
//       <h1 className="text-4xl font-bold text-violet-700 mb-4">Checkout Page</h1>
//       <p className="text-xl text-gray-600 mb-8">This is a placeholder for your checkout form.</p>
//     </div>
//   );  
// };

// export default Checkout;



import React, { useState } from "react";

const Checkout = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create an order on your backend
      const response = await fetch("http://localhost:5000/api/payment/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount * 100 }), // amount in paise
      });

      const order = await response.json();

      if (!order.id) {
        throw new Error("Failed to create order");
      }

      // Step 2: Open Razorpay checkout
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay key
        amount: order.amount,
        currency: "INR",
        name: "ShopMate",
        description: "Ecommerce Payment",
        order_id: order.id,
        handler: async function (response) {
          // Step 3: Verify payment on your backend
          const verify = await fetch("http://localhost:5000/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const result = await verify.json();
          alert(result.message || "Payment Successful!");
        },
        theme: { color: "#7c3aed" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 text-center">
      <h1 className="text-4xl font-bold text-violet-700 mb-4">Checkout Page</h1>
      <p className="text-xl text-gray-600 mb-8">
        Complete your purchase securely using Razorpay.
      </p>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <label className="block text-gray-700 font-semibold mb-2">
          Enter Amount (₹)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="e.g., 999"
        />
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
