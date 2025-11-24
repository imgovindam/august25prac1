// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { PlusIcon } from "@heroicons/react/24/solid";
// import { Toaster, toast } from "react-hot-toast";
// import Footer from "./Footer";

// const Card = ({ search, addToCart, removeFromCart, cartCounts }) => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [debouncedSearch, setDebouncedSearch] = useState(search);
//   const debounceTimeoutRef = useRef(null);
//   const navigate = useNavigate();

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         "https://dummyjson.com/products?limit=100"
//       );
//       setData(response.data.products);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
//     debounceTimeoutRef.current = setTimeout(() => {
//       setDebouncedSearch(search);
//       setCurrentPage(1);
//     }, 600);
//     return () => clearTimeout(debounceTimeoutRef.current);
//   }, [search]);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const itemPerpage = 9;
//   const filteredData = data.filter(
//     (item) =>
//       item.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
//       item.category.toLowerCase().includes(debouncedSearch.toLowerCase())
//   );
//   // const filteredData = data.filter(
//   //   (item) =>
//   //     item.title.toLowerCase().includes(search.toLowerCase())||
//   //     item.category.toLowerCase().includes(search.toLowerCase()));

//   const totalPages = Math.ceil(filteredData.length / itemPerpage);
//   const startIndex = (currentPage - 1) * itemPerpage;
//   const paginatedData = filteredData.slice(
//     startIndex,
//     startIndex + itemPerpage
//   );

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (error)
//     return (
//       <div className="text-red-500 text-center mt-4 flex flex-col justify-center items-center">
//         Error: {error}
//         <img
//           src="https://placehold.co/400x300/e9d5ff/7c3aed?text=No+Data"
//           alt="No data found"
//           className="mt-4"
//         />
//       </div>
//     );

//   return (
//     <>

//     <div className="min-h-screen bg-gradient-to-br from-violet-100 via-white to-blue-100 py-10 px-3 sm:px-6 lg:px-10">
//       <Toaster position="top-center" />

//       {paginatedData.length > 0 ? (
//         <div
//           className="
//             grid
//             grid-cols-1
//             sm:grid-cols-2
//             lg:grid-cols-3
//             xl:grid-cols-3
//             gap-6
//             place-items-center
//             max-w-7xl
//             mx-auto
//           "
//         >
//           {paginatedData.map((item) => (
//             <div
//               key={item.id}
//               className="
//                 col-span-1
//                 w-full
//                 max-w-[320px]
//                 bg-white/70
//                 backdrop-blur-md
//                 border
//                 border-gray-200
//                 rounded-2xl
//                 shadow-lg
//                 flex flex-col
//                 justify-between
//                 items-center
//                 p-4
//                 transition
//                 transform
//                 duration-300
//                 hover:scale-[1.03]
//                 hover:shadow-2xl
//               "
//               onClick={() => navigate(`/product/${item.id}`)}
//             >
//               <div className="w-full bg-yellow-100  flex justify-center items-center">
//                 <img
//                   className="w-48 h-48 object-cover rounded-xl shadow-inner"
//                   src={item.thumbnail}
//                   alt={item.title}
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src =
//                       "https://placehold.co/192x192/7c3aed/ffffff?text=Image+Not+Found";
//                   }}
//                 />
//               </div>

//               <div className="flex flex-col items-center mt-4 text-center w-full">
//                 <h2 className="text-lg sm:text-xl font-semibold text-violet-800 truncate w-full px-2">
//                   {item.title}
//                 </h2>
//                 <p className="text-sm text-gray-500 capitalize mt-1">
//                   {item.category}
//                 </p>
//                 <p className="text-2xl font-bold text-gray-900 mt-2">
//                   ₹{item.price.toFixed(2)}
//                 </p>
//               </div>

//               <div className="flex gap-3 items-center mt-4">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     toast.error("Item removed from cart");
//                     {
//                       item.length !== 0
//                         ? removeFromCart(item)
//                         : toast.error("Item not in cart");
//                     }
//                     // removeFromCart(item);
//                   }}
//                   className="px-3 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition"
//                 >
//                   −
//                 </button>
//                 <span className="text-lg font-bold text-gray-800">
//                   {cartCounts[item.id] || 0}
//                 </span>

//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     // {
//                     //   addToCart(item) ? ( toast.success("Item added to cart")): (toast.error("Failed to add item to cart"));
//                     // }
//                     toast.success("Item added to cart");
//                     addToCart(item);
//                   }}
//                   className="px-3 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition"
//                 >
//                   <PlusIcon className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="flex justify-center items-center h-auto mt-10">
//           <img
//             src="https://placehold.co/400x300/e9d5ff/7c3aed?text=No+Data"
//             alt="No data found"
//           />
//         </div>
//       )}

//       {/* Pagination */}
//       {paginatedData.length > 0 && (
//         <div className="flex flex-wrap justify-center items-center gap-4 mt-10">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-violet-700 text-white rounded-lg shadow-md disabled:opacity-50 hover:bg-violet-800 transition"
//           >
//             Prev
//           </button>

//           <div className="flex flex-wrap gap-2">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i + 1}
//                 onClick={() => handlePageChange(i + 1)}
//                 className={`px-3 py-1.5 rounded-lg font-semibold transition ${
//                   currentPage === i + 1
//                     ? "bg-violet-600 text-white shadow-lg"
//                     : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>

//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage >= totalPages}
//             className="px-4 py-2 bg-violet-700 text-white rounded-lg shadow-md disabled:opacity-50 hover:bg-violet-800 transition"
//           >
//             Next
//           </button>
//         </div>
//       )}

//     </div>
//       <Footer />

//           </>
//   );
// };

// export default Card;

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusIcon,
  MinusIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { Toaster, toast } from "react-hot-toast";
import { motion } from "framer-motion";
import Footer from "./Footer";

const Card = ({ search, addToCart, removeFromCart, cartCounts }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const debounceTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products?limit=100"
      );
      setData(response.data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 600);
    return () => clearTimeout(debounceTimeoutRef.current);
  }, [search]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const itemsPerPage = 9;
  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(debouncedSearch.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading)
    return (
      <p className="text-center mt-10 text-violet-700 font-medium">
        Loading...
      </p>
    );
  if (error)
    return (
      <div className="text-red-500 text-center mt-4 flex flex-col justify-center items-center">
        Error: {error}
        <img
          src="https://placehold.co/400x300/e9d5ff/7c3aed?text=No+Data"
          alt="No data found"
          className="mt-4"
        />
      </div>
    );

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-gradient-to-br from-white via-violet-50 to-indigo-100 py-12 px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-violet-800 mb-2">
            Our Products
          </h1>
          <p className="text-gray-600">
            Discover our latest collection curated just for you.
          </p>
        </div>

        {paginatedData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {paginatedData.map((item, index) => (
              <motion.div
                key={item.id}
                className="group bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300"
                onClick={() => navigate(`/product/${item.id}`)}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="relative w-full bg-gradient-to-tr from-violet-100 to-indigo-100 flex justify-center items-center h-56">
                  <img
                    className="object-contain h-40 group-hover:scale-110 transition-transform duration-300"
                    src={item.thumbnail}
                    alt={item.title}
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/192x192/7c3aed/ffffff?text=No+Image";
                    }}
                  />
                </div>

                <div className="p-5 text-center">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-500 capitalize mt-1">
                    {item.category}
                  </p>
                  <p className="text-2xl font-bold text-violet-700 mt-3">
                    ₹{item.price.toFixed(2)}
                  </p>

                  <div className="flex justify-center gap-4 items-center mt-5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromCart(item);

                        toast.error("Item removed from cart");
                      }}
                      className="p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
                      aria-label={`Decrease quantity for ${item.title}`}
                      type="button"
                    >
                      <MinusIcon className="h-5 w-5" />
                    </button>

                    <span className="text-lg font-semibold text-gray-800 w-6 text-center">
                      {cartCounts[item.id] || 0}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                        toast.success("Item added to cart");
                      }}
                      className="p-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition"
                      aria-label={`Add ${item.title} to cart`}
                      type="button"
                    >
                      <PlusIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-auto mt-10">
            <img
              src="https://placehold.co/400x300/e9d5ff/7c3aed?text=No+Products+Found"
              alt="No data found"
            />
          </div>
        )}

        {/* Pagination */}
        {paginatedData.length > 0 && (
          <div className="flex justify-center items-center gap-3 mt-12 flex-wrap">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-violet-700 text-white rounded-lg shadow-md disabled:opacity-40 hover:bg-violet-800 transition"
            >
              Prev
            </button>

            <div className="flex gap-2 flex-wrap justify-center">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1.5 rounded-md font-semibold transition ${
                    currentPage === i + 1
                      ? "bg-violet-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 bg-violet-700 text-white rounded-lg shadow-md disabled:opacity-40 hover:bg-violet-800 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Card;
