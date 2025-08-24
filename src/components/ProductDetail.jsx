import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
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
    <div className="p-6 max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-violet-900 text-white rounded"
      >
        ⬅ Back
      </button>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-80 object-cover rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-600 mt-2">{product.category}</p>
      <p className="mt-4">{product.description}</p>
      <p className="mt-2 text-lg font-semibold">Price: ${product.price}</p>
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
