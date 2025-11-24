
// import { Drawer } from "antd";

import { useNavigate } from "react-router-dom";

// function Cart({ cartItems, removeFromCart }) {

//   console.log(cartItems);
//   return (
//     <div>
//       <h2>Your Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>No items in cart</p>
//       ) : (
//         cartItems.map((item) => (
//           <div key={item.id}>
//             <div>
//               <p>{item.name}</p>
//               <img src={item.thumbnail} />
//             </div>
//             <button onClick={() => removeFromCart(item.id)}>Remove</button>
//           </div>

        
//         ))
//       )}
//     </div>
//   );
// }

// export default Cart;



const Cart = ({ cartItems, removeFromCart }) => {
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
  
  return (
    <div className="container mx-auto p-4 md:p-8 pt-32 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-violet-800 mb-10">Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="text-center text-lg text-gray-500">Your cart is empty.</div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 my-4 border-b last:border-b-0">
              <div className="flex items-center space-x-4 flex-grow">
                <img src={item.thumbnail} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xl font-bold text-violet-600">${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => removeFromCart(item)}
                  className="p-2 bg-red-500 text-white rounded-full transition duration-300 hover:bg-red-600"
                  aria-label={`Remove one ${item.title} from cart`}
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.013 21H7.987a2 2 0 01-1.92-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">Total Price: ${totalPrice.toFixed(2)}</h3>
            <button
              onClick={() => navigate('/checkout')}
              className="mt-4 md:mt-0 px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-violet-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;