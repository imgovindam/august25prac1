
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
import { useEffect, useState } from "react";
// import Navbar from "./components/Navbar";

import Navbar from "./components/Navbar";

import Card from "./components/Card";
import ProductDetail from "./components/ProductDetail";
import "./App.css";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";







// function App() {
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [darkMode, setDarkMode] = useState(false);

//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (item) => {
//     setCartItems((prev) => [...prev, item]);
//   };

//   // const removeFromCart = (id) => {
//   //   setCartItems((prev) => prev.filter((item) => item.id !== id));
//   // };

  

//     const removeFromCart = (removeIndex) => {
//     setCartItems((prev) => prev.filter((item,idx) => 
      
      
//   idx !== removeIndex))
//     //   idx !== removeIndex)
    
//     // );
//     console.log("i am remove index",removeIndex)
//   };

//   // const handleDataRemove = (removeIndex) => {
//   //   setData((data) => data.filter((item, idx) => idx !== removeIndex));
//   // };

//   const handleDarkMode = () => {
//     setDarkMode((prev) => !prev);
//   };

//   const containerStyle = darkMode
//     ? { backgroundColor: " #5c4d7d", color: "#000" }
//     : { backgroundColor: "#d6eadf", color: "#111" };
//   return (
//     <div className="will-change-transform min-w-max">
//       <Router>
//         <Navbar
//           search={search}
//           currentPage={currentPage}
//           setCurrentPage={setCurrentPage}
//           setSearch={setSearch}
//           darkMode={darkMode}
//           handleDarkMode={handleDarkMode}
//           cartCount={cartItems.length}
//           cartItems={cartItems}
//           removeFromCart={removeFromCart}
//         />
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <Card
//                 search={search}
//                 containerStyle={containerStyle}
//                 addToCart={addToCart}
//                 removeFromCart={removeFromCart}
//               />
//             }
//           />
//           <Route
//             path="/product/:id"
//             element={
//               <ProductDetail
//                 containerStyle={containerStyle}
//                 addToCart={addToCart}
//               />
//             }
//           />

//           <Route
//             path="/Cart"
//             element={
//               <Cart
//                 cartItems={cartItems}
//                 removeFromCart={removeFromCart} // ✅ Pass function
//               />
//             }
//           />

//           <Route path="/Checkout" element={<Checkout />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;



const App = () => {
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Initialize state with data from localStorage or empty values
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('shoppingCart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart items from localStorage", error);
      return [];
    }
  });

  const [cartCounts, setCartCounts] = useState(() => {
    try {
      const savedCounts = localStorage.getItem('cartCounts');
      return savedCounts ? JSON.parse(savedCounts) : {};
    } catch (error) {
      console.error("Failed to parse cart counts from localStorage", error);
      return {};
    }
  });

  // Save cartItems to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart items to localStorage", error);
    }
  }, [cartItems]);

  // Save cartCounts to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cartCounts', JSON.stringify(cartCounts));
    } catch (error) {
      console.error("Failed to save cart counts to localStorage", error);
    }
  }, [cartCounts]);
  
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((cartItem) => cartItem.id === item.id);
      if (itemExists) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    setCartCounts((prevCounts) => ({
      ...prevCounts,
      [item.id]: (prevCounts[item.id] || 0) + 1,
    }));
  };

  const removeFromCart = (item) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((cartItem) => cartItem.id === item.id);
      if (itemExists.quantity === 1) {
        return prevItems.filter((cartItem) => cartItem.id !== item.id);
      }
      return prevItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      );
    });
    setCartCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      if (newCounts[item.id] > 0) {
        newCounts[item.id]--;
      }
      return newCounts;
    });
  };

  const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  
  const handleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const containerStyle = darkMode
    ? { backgroundColor: "#5c4d7d", color: "#000" }
    : { backgroundColor: "#d6eadf", color: "#111" };

  return (
    <div className="will-change-transform min-w-max">
      <Router>
        <Navbar
          search={search}
          setSearch={setSearch}
          darkMode={darkMode}
          handleDarkMode={handleDarkMode}
          cartCount={totalItems}
          cartItems={cartItems}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Card
                search={search}
                containerStyle={containerStyle}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                cartCounts={cartCounts}
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
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route path="/Checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;