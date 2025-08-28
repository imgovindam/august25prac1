import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = ({ containerStyle }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading product...</p>;

  return (
    <div className="p-  mx-auto" style={containerStyle}>
      <div className="flex justify-center items-center  flex-col  ">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 bg-violet-900 text-white rounded"
          >
            ⬅ Back
          </button>
        </div>
        <div className="flex flex-col">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-80 object-cover rounded bg-no-repeat bg-cover"
          />
          <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
          <p className="text-gray-600 mt-2">{product.category}</p>
          <p className="mt-4">{product.description}</p>
          <p className="mt-2 text-lg font-semibold">Price: ${product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

// import React from "react";
// import { useParams } from "react-router-dom";
// import { useGetProductByIdQuery } from "../redux/apiSlice";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const { data, error, isLoading } = useGetProductByIdQuery(id);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error fetching product</p>;

//   return (
//     <div>
//       <h2>{data.title}</h2>
//       <p>{data.description}</p>
//     </div>
//   );
// };

// export default ProductDetail;

// ***To-list

// import React, { useState } from "react";

// const ProductDetail = () => {
//   const [inputText, setInputText] = useState("");
//   const [data, setData] = useState([]);

//   const handleDataInput = () => {
//     if (!inputText.trim()) return;
//     setData([
//       ...data,
//       {
//         inputText,
//         id: crypto.randomUUID(),
//         text: inputText.trim(),
//         createdAt: Date.now(),
//       },
//     ]);

//     setInputText("");
//   };
//   const handleDataRemove = (removeIndex) => {
//     setData((data) => data.filter((item, idx) => idx !== removeIndex));
//   };
//   console.log(data);
//   console.log(inputText);

//   const timeCurrent = Date.now();

//   console.log(timeCurrent);

//   return (
//     <div>
//       <div className="flex">
//         <input
//           className="border p-4 m-5"
//           value={inputText}
//           type="text"
//           placeholder="Your To-do"
//           onChange={(e) => setInputText(e.target.value)}
//         />
//         <button
//           className="px-4 py-4 mx-4 my-4 bg-red-400 cursor-pointer"
//           onClick={handleDataInput}
//         >
//           Add
//         </button>
//       </div>
//       {data.length <= 0
//         ? "No data to displaye"
//         : data.map((item, index) => {
//             return (
//               <div key={index}>
//                 {item.inputText}{" "}
//                 <button
//                   className="px-4 py-4 mx-4 my-4 bg-amber-600 cursor-pointer"
//                   onClick={() => handleDataRemove(index)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             );
//           })}
//     </div>
//   );
// };

// export default ProductDetail;
