

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
// import Navbar from "./components/Navbar";

import Navbar from "./components/Navbar";

import Card from "./components/Card";
import ProductDetail from "./components/ProductDetail";
import "./App.css";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

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
    console.log(item,"item in appjs");
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


  // ** corrected removedFrom the cart function **

  const removeFromCart = (item) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((cartItem) => cartItem.id === item.id);
      if (!itemExists) return prevItems;
      if (itemExists.quantity === 1) {
        return prevItems.filter((cartItem) => cartItem.id !== item.id);
      }
      return prevItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      );
    });

  
  // const removeFromCart = (item) => {
  //   setCartItems((prevItems) => {
  //     const itemExists = prevItems.find((cartItem) => cartItem.id === item.id);
  //     if (itemExists.quantity === 1) {
  //       return prevItems.filter((cartItem) => cartItem.id !== item.id);
  //     }
  //     return prevItems.map((cartItem) =>
  //       cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
  //     );
  //   });


    setCartCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      if (newCounts[item.id] >= 0) {
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
    <div className="will-change-transform min-w-max ">
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