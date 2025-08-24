

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const itemPerpage = 10;

const Card = ({ search }) => {
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



//*****Update debouncedSearch after a delay
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);

      // Reset to first page on new search
    }, 600);

    // 300ms debounce delay

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [search]); // Only re-run if search changes


  const handlePageChange=(pageNumber)=>{
setCurrentPage(pageNumber)

window.scrollTo({top:0 ,behavior:"smooth"})
  }

  if (error)
    return <p className="text-red-500 text-center mt-4">Error: {error}</p>;

  // Search filter
  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemPerpage);
  const startIndex = (currentPage - 1) * itemPerpage;
  const endIndex = currentPage * itemPerpage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      {paginatedData.length > 0 ? (
        <div className="grid grid-cols-12 bg-[#d8e2dc]">
          {paginatedData.map((item) => (
            <div
              key={item.id}
              className="col-span-4  flex flex-col justify-center items-center cursor-pointer"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <div className="flex flex-col p-4 m-4 items-center justify-center flex-1">
                <div className="border rounded-2xl">
                  <img
                    className="m-4 w-40 h-40 object-cover"
                    src={item.thumbnail}
                    alt={item.title}
                  />
                </div>

                <h2 className="text-lg font-medium text-violet-800">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No data found with your search</p>
      )}

      {paginatedData.length > 0 && (
        <div className="flex justify-center items-center gap-4 my-4 bg-">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-violet-900 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="p-2 bg-violet-900 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Card;



// import React from "react";
// import { useGetProductsQuery } from "../redux/apiSlice";

// const Products = () => {
//   const { data, error, isLoading } = useGetProductsQuery();

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Something went wrong</p>;

//   return (
//     <div>
//       <h2>Products</h2>
//       <ul>
//         {data.products.map((p) => (
//           <li key={p.id}>{p.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Products;
