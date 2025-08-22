// import axios from "axios";
// import { useEffect, useState } from "react";

// const Card = () => {
//   const [allData, setAllData] = useState([]);
//   const [currentPage, setcurrentPage] = useState(1);
//   const [search, setSearch] = useState("");

//   const limit = 10; // items per page

//   const fetchData = async () => {
//     try {
//       const res = await axios.get("https://dummyjson.com/products?limit=100");
//       setAllData(res.data.products);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   //****filter first, then paginate

//   const filteredData = allData.filter(
//     (item) =>
//       item.title.toLowerCase().includes(search.toLowerCase()) ||
//       item.category.toLowerCase().includes(search.toLocaleLowerCase())
//   );
//   // ** pagination
//   const start = (currentPage - 1) * limit;
//   const paginatedData = filteredData.slice(start, start + limit);

//   console.log(allData);

//   return (
//     <>
//       <div className="flex justify-center my-4">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setcurrentPage(1); // reset page on new search
//           }}
//           className="border p-2 rounded w-1/2"
//         />
//       </div>

//       <div className="grid grid-cols-12 gap-4 p-5">
//         {paginatedData.map((item, i) => (
//           <div
//             key={i}
//             className="col-span-6 sm:col-span-4 lg:col-span-4 p-4 border rounded"
//           >
//             <img
//               src={item.thumbnail}
//               alt={item.title}
//               className="w-full h-auto object-cover flex justify-center items-center bg-no-repeat"
//             />
//             <h2 className="text-lg font-medium text-center mt-2">
//               {item.title}
//             </h2>
//             <h2 className="text-lg font-medium text-center mt-2">
//               {item.category}
//             </h2>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-center gap-4 my-6">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setcurrentPage(currentPage - 1)}
//           className="border px-4 py-2 rounded disabled:opacity-50"
//         >
//           Prev
//         </button>
//         <span className="px-4 py-2">Page {currentPage}</span>
//         <button
//           disabled={start + limit >= filteredData.length}
//           onClick={() => setcurrentPage(currentPage + 1)}
//           className="border px-4 py-2 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </>
//   );
// };

// export default Card;

import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

const itemPerpage = 10;

const Card = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  //*****Debounce the search input
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const debounceTimeoutRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products?limit=5000"
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

  console.log("direct data from the data API", data);

  if (error)
    return <p className="text-red-500 text-center mt-4">Error: {error}</p>;

  // *** for search
  // Use debouncedSearch for filtering
  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(debouncedSearch.toLocaleLowerCase())
  );

  // ** Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemPerpage);
  const startIndex = (currentPage - 1) * itemPerpage;
  const endIndex = currentPage * itemPerpage;

  const paginatedData = filteredData.slice(startIndex, endIndex);

  // ****

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to the top of the page smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  console.log("data from pagination", paginatedData);
  if (loading)
    return (
      <div className="loading-spinner">
        Loading...
        <span className="spinner-icon"></span>
      </div>
    );

  console.log("from search ", search);
  return (
    <>
      <div className="  flex justify-center items-center m-6 ">
        <input
          className="p-6 border w-[60%] border-violet-900 bg-violet-50 rounded-2xl"
          value={search} // Controlled component for input
          type="text"
          placeholder="Search Product..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {paginatedData.length > 0 ? (
        <div className="grid grid-cols-12">
          {paginatedData.map((item) => {
            return (
              <div
                key={item.id}
                className="col-span-4 flex flex-col justify-center items-center "
              >
                <div
                  className="flex flex-col  border p-4 m-4 items-center justify-center flex-1 border-fuchsia-900 rounded-xl
"
                >
                  <img
                    className="flex bg-no-repeat items-center justify-center  m-4"
                    src={item.thumbnail}
                    alt={item.title} // Added alt text for accessibility
                  />

                  <h2
                    className="text-justify font-sans font-medium text-violet-800 leading-3 font subpixel-antialiased tracking-wide underline decoration-indigo-500

"
                  >
                    {item.title}
                    <p className="text-sm text-gray-600">
                      {item.category}
                    </p>{" "}
                 
                  </h2>
                </div>
                <p className="overflow-hidden text-clip text-wrap">
                  {item.description}
                </p>{" "}
              
              </div>
            );
          })}
        </div>
      ) : (
        <p>No data Found with your search</p>
      )}

      {paginatedData.length > 0 && (
        <div className="flex justify-center items-center  ">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-violet-950 text-center cursor-pointer  text-white rounded-4xl  border flex items-center justify-center  border-violet-900"
          >
            Previous
          </button>
          <span className="p-4">{currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="p-2 bg-violet-950 text-center cursor-pointer  text-white rounded-4xl  border flex items-center justify-center  border-violet-900"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Card;
