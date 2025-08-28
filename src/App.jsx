// import "./App.css";
// import Card from "./components/Card";
// import Navbar from "./components/navbar";

// function App() {
//   return (
//     <>
//       <div>
//         <div>
//           <Navbar />
//         </div>
//         <div>
//           <Card />
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
// import Navbar from "./components/Navbar";

import Navbar from "./components/navbar";

import Card from "./components/Card";
import ProductDetail from "./components/ProductDetail";
import "./App.css";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [darkMode, setDarkMode] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const containerStyle = darkMode
    ? { backgroundColor: " #5c4d7d", color: "#fff" }
    : { backgroundColor: "#d6eadf", color: "#111" };
  return (
    <div className="will-change-transform min-w-max">
      <Router>
        <Navbar
          search={search}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSearch={setSearch}
          darkMode={darkMode}
          handleDarkMode={handleDarkMode}
          cartCount={cartItems.length}
          cartItems={cartItems}
          removeFromCart={removeFromCart}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Card
                search={search}
                containerStyle={containerStyle}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetail
                containerStyle={containerStyle}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/Cart"
            element={
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart} // ✅ Pass function
              />
            }
          />

          <Route path="/Checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
