import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Drawer } from "antd";

const Navbar = ({
  search,
  setSearch,
  darkMode,
  handleDarkMode,
  cartCount,
  cartItems,
  removeFromCart,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const handleNavigate = () => {
    navigate("/");
    setSearch("");
  };

  const handleCheckOutNavigate = () => {
    navigate("/Checkout");
    setOpen(false);
  };



  // **** This is also correct ****
  // const totalPrice = cartItems.reduce(
  //   (total, item) => total + (item.price || 0) * (item.quantity || 1),
  //   0
  // );



// **** Using Nullish Coalescing Operator (??) to handle undefined or null values ****

 // **** This is also correct ****

const totalPrice=cartItems.reduce((total,item)=>{
  return total+=(item?.price??0)*(item?.quantity??1)

},0)


// const totalPrice = cartItems.reduce((total, item) => 
//   total + (item?.price || 0) * (item?.quantity || 1), 0
// );






  return (
    <div className="bg-gradient-to-r from-[#560bad] via-purple-600 to-pink-600 text-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <h1
        className="text-xl font-bold text-[#efebe0] cursor-pointer"
        onClick={handleNavigate}
      >
        MyShop
      </h1>

      {/* Search */}
      <input
        type="text"
        value={search}
        placeholder="Search products..."
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded-lg w-[40%] border-[#efebe0] bg-[#efebe0] text-black outline-0"
      />

      {/* Dark Mode Toggle */}
      <div>
        <button className="cursor-pointer text-4xl" onClick={handleDarkMode}>
          {darkMode ? "🌑" : "☀️"}
        </button>
      </div>

      {/* Cart Icon */}
      <div
        onClick={showDrawer}
        className="cursor-pointer flex items-center gap-1 hover:scale-110 duration-300 hover:text-violet-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-10"
        >
          <path d="M1.75 1.002a.75.75 0 1 0 0 1.5h1.835l1.24 5.113A3.752 3.752 0 0 0 2 11.25c0 .414.336.75.75.75h10.5a.75.75 0 0 0 0-1.5H3.628A2.25 2.25 0 0 1 5.75 9h6.5a.75.75 0 0 0 .73-.578l.846-3.595a.75.75 0 0 0-.578-.906 44.118 44.118 0 0 0-7.996-.91l-.348-1.436a.75.75 0 0 0-.73-.573H1.75ZM5 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM13 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
        </svg>
        <span className="font-semibold">{cartCount}</span>
      </div>

      {/* Drawer */}
      <Drawer
        title="Your Cart"
        closable={true}
        onClose={onClose}
        open={open}
        width={600}
        aria-label="Shopping cart drawer"
      >
        <div className="space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 border rounded-lg"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title || "Product image"}
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) => {
                    e.target.src =
                      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" fill="%23f3f4f6"/><text x="32" y="32" text-anchor="middle" dy="0.3em" font-family="Arial" font-size="10" fill="%236b7280">No Image</text></svg>';
                  }}
                />
                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  {item.quantity && (
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  )}
                  {item.price && (
                    <p className="text-sm font-semibold text-green-600">
                      ₹{item.price}
                    </p>
                  )}
                </div>
                {item.quantity}*{item.price}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors cursor-pointer"
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
  <path fill-rule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clip-rule="evenodd" />
</svg>

                </button>
              </div>
            ))
          )}
          Total Price:{" "}
          <span className="font-bold text-lg">₹{totalPrice.toFixed(2)}</span>
        </div>

        {cartItems.length > 0 && location.pathname !== "/Checkout" && (
          <div className="mt-6 pt-4 border-t">
            <button
              onClick={handleCheckOutNavigate}
              className="w-full py-3 bg-lime-700 text-white rounded-lg hover:bg-lime-900 transition-colors font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Navbar;
