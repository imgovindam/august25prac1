// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// // const ProductDetail = ({ containerStyle }) => {
// //   const { id } = useParams();
// //   const [product, setProduct] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     axios.get(`https://dummyjson.com/products/${id}`).then((res) => {
// //       setProduct(res.data);
// //     });
// //   }, [id]);
  

// //   console.log(product)

// //   if (!product) return <p className="text-center mt-10">Loading product...</p>;

// //   return (
// //     <div className="p-  mx-auto" style={containerStyle}>
// //       <div className="flex justify-center items-center  flex-col  ">
// //         <div>
// //           <button
// //             onClick={() => navigate(-1)}
// //             className="mb-4 px-4 py-2 bg-violet-900 text-white rounded"
// //           >
// //             ⬅ Back
// //           </button>
// //         </div>
// //         <div className="flex flex-col">
// //           <img
// //             src={product.thumbnail}
// //             alt={product.title}
// //             className="w-full h-80 object-cover rounded bg-no-repeat bg-cover"
// //           />
// //           <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
// //           <p className="text-gray-600 mt-2">{product.category}</p>
// //           <p className="mt-4">{product.description}</p>
// //           <p className="mt-2 text-lg font-semibold">Price: ${product.price}</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductDetail;



// const ProductDetail = ({ containerStyle, addToCart }) => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [generatedDescription, setGeneratedDescription] = useState(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isReading, setIsReading] = useState(false);

//   // Fetch product data
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`https://dummyjson.com/products/${id}`);
//         setProduct(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   // Handle generating a new description using Gemini API
//   const generateDescription = async () => {
//     setIsGenerating(true);
//     setGeneratedDescription(null);
//     try {
//       const prompt = `Write a compelling and creative e-commerce product description for a product titled "${product.title}" in the category of "${product.category}". Highlight its key features and evoke a sense of desire.`;
//       const apiKey = "";
//       const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
//       const payload = {
//         contents: [{ parts: [{ text: prompt }] }],
//       };
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });
//       const result = await response.json();
//       const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
//       if (text) {
//         setGeneratedDescription(text);
//       } else {
//         throw new Error("Failed to generate description.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Failed to generate description. Please try again.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // Handle TTS for the description
//   const readDescription = async () => {
//     setIsReading(true);
//     try {
//       const textToRead = generatedDescription || product.description;
//       if (!textToRead) {
//         return;
//       }
//       const apiKey = "";
//       const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;
//       const payload = {
//         contents: [{ parts: [{ text: textToRead }] }],
//         generationConfig: {
//           responseModalities: ["AUDIO"],
//           speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Puck" } } },
//         },
//       };

//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error(`TTS API failed with status: ${response.status}`);
//       }

//       const result = await response.json();
//       const part = result?.candidates?.[0]?.content?.parts?.[0];
//       const audioData = part?.inlineData?.data;
//       const mimeType = part?.inlineData?.mimeType;

//       if (audioData && mimeType && mimeType.startsWith("audio/")) {
//         const sampleRate = parseInt(mimeType.match(/rate=(\d+)/)[1], 10);
//         const pcmData = Uint8Array.from(atob(audioData), c => c.charCodeAt(0)).buffer;
//         const wavBlob = pcmToWav(pcmData, sampleRate);
//         const audioUrl = URL.createObjectURL(wavBlob);
//         new Audio(audioUrl).play();
//       } else {
//         throw new Error("No audio data received from TTS API.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Failed to generate speech. Please try again.");
//     } finally {
//       setIsReading(false);
//     }
//   };

//   if (loading) return <div className="text-center pt-32 text-2xl font-semibold">Loading product details...</div>;
//   if (error) return <div className="text-center pt-32 text-red-500 text-2xl font-semibold">Error: {error}</div>;
//   if (!product) return <div className="text-center pt-32 text-2xl font-semibold">Product not found.</div>;

//   return (
//     <div className="container mx-auto p-4 md:p-8 pt-32 min-h-screen" style={containerStyle}>
//       <div className="bg-white rounded-xl shadow-lg p-6 md:p-12 flex flex-col md:flex-row gap-8">
//         <div className="md:w-1/2 flex justify-center items-center">
//           <img src={product.thumbnail} alt={product.title} className="rounded-xl w-full h-auto object-cover shadow-inner" />
//         </div>
//         <div className="md:w-1/2 flex flex-col justify-center">
//           <h1 className="text-4xl font-bold text-violet-800 mb-2">{product.title}</h1>
//           <p className="text-xl text-gray-600 mb-4">{product.category}</p>
//           <p className="text-3xl font-extrabold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
//           <div className="flex flex-col gap-4 mb-6">
//             <button
//               onClick={generateDescription}
//               disabled={isGenerating}
//               className="px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-violet-700 disabled:opacity-50"
//             >
//               {isGenerating ? "Generating..." : "Generate Description ✨"}
//             </button>
//             <button
//               onClick={readDescription}
//               disabled={isReading || (!generatedDescription && !product.description)}
//               className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-indigo-700 disabled:opacity-50"
//             >
//               {isReading ? "Reading..." : "Read Description Aloud 🔊"}
//             </button>
//           </div>
//           <p className="text-gray-700 text-base leading-relaxed">
//             {generatedDescription || product.description}
//           </p>
//           <div className="flex gap-4 items-center mt-6">
//             <button
//               onClick={() => addToCart(product)}
//               className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
//             >
//               Add to Cart
//             </button>
//             <button
//               onClick={() => navigate('/')}
//               className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
//             >
//               Go Back
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

// // import React from "react";
// // import { useParams } from "react-router-dom";
// // import { useGetProductByIdQuery } from "../redux/apiSlice";

// // // const ProductDetail = () => {
// // //   const { id } = useParams();
// // //   const { data, error, isLoading } = useGetProductByIdQuery(id);

// // //   if (isLoading) return <p>Loading...</p>;
// // //   if (error) return <p>Error fetching product</p>;

// //   return (
// //     <div>
// //       <h2>{data.title}</h2>
// //       <p>{data.description}</p>
// //     </div>
// //   );
// // };

// // export default ProductDetail;

// // ***To-list

// // import React, { useState } from "react";

// // const ProductDetail = () => {
// //   const [inputText, setInputText] = useState("");
// //   const [data, setData] = useState([]);

// //   const handleDataInput = () => {
// //     if (!inputText.trim()) return;
// //     setData([
// //       ...data,
// //       {
// //         inputText,
// //         id: crypto.randomUUID(),
// //         text: inputText.trim(),
// //         createdAt: Date.now(),
// //       },
// //     ]);

// //     setInputText("");
// //   };
// //   const handleDataRemove = (removeIndex) => {
// //     setData((data) => data.filter((item, idx) => idx !== removeIndex));
// //   };
// //   console.log(data);
// //   console.log(inputText);

// //   const timeCurrent = Date.now();

// //   console.log(timeCurrent);

// //   return (
// //     <div>
// //       <div className="flex">
// //         <input
// //           className="border p-4 m-5"
// //           value={inputText}
// //           type="text"
// //           placeholder="Your To-do"
// //           onChange={(e) => setInputText(e.target.value)}
// //         />
// //         <button
// //           className="px-4 py-4 mx-4 my-4 bg-red-400 cursor-pointer"
// //           onClick={handleDataInput}
// //         >
// //           Add
// //         </button>
// //       </div>
// //       {data.length <= 0
// //         ? "No data to displaye"
// //         : data.map((item, index) => {
// //             return (
// //               <div key={index}>
// //                 {item.inputText}{" "}
// //                 <button
// //                   className="px-4 py-4 mx-4 my-4 bg-amber-600 cursor-pointer"
// //                   onClick={() => handleDataRemove(index)}
// //                 >
// //                   Remove
// //                 </button>
// //               </div>
// //             );
// //           })}
// //     </div>
// //   );
// // };

// // // export default ProductDetail;



import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { generateProductDescription, generateSpeech } from '../utils/aiServices';

const ProductDetail = ({ containerStyle, addToCart }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatedDescription, setGeneratedDescription] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReading, setIsReading] = useState(false);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Add this useEffect to your ProductDetail component
useEffect(() => {
  console.log('🔍 Vite Environment Debug:');
  console.log('API Key exists:', !!import.meta.env.VITE_GEMINI_API_KEY);
  console.log('API Key length:', import.meta.env.VITE_GEMINI_API_KEY?.length || 0);
  console.log('First 10 chars:', import.meta.env.VITE_GEMINI_API_KEY?.substring(0, 10) || 'NONE');
  
  // List all VITE_ variables
  console.log('All import.meta.env:', import.meta.env);
}, []);
const handleGenerateDescription = async () => {
  if (!product) return;

  console.log('🚀 Starting description generation for:', product.title);
  setIsGenerating(true);
  setError(null);

  try {
    console.log('📞 Calling generateProductDescription...');
    const description = await generateProductDescription(product);
    console.log('✅ Description generated:', description);
    setGeneratedDescription(description);
  } catch (err) {
    console.error('❌ Failed to generate description:', err);
    console.error('Error message:', err.message);
    setError(err.message || "Failed to generate description. Please check your API key.");
  } finally {
    setIsGenerating(false);
  }
};


  // // Handle generating description using our AI service
  // const handleGenerateDescription = async () => {
  //   if (!product) return;

  //   setIsGenerating(true);
  //   setError(null);

  //   try {
  //     const description = await generateProductDescription(product);
  //     setGeneratedDescription(description);
  //   } catch (err) {
  //     console.error('Failed to generate description:', err);
  //     setError(err.message || "Failed to generate description. Please check your API key.");
  //   } finally {
  //     setIsGenerating(false);
  //   }
  // };

  // Handle text-to-speech using our AI service
  const handleReadDescription = async () => {
    const textToRead = generatedDescription || product?.description;
    if (!textToRead) return;

    setIsReading(true);
    setError(null);

    try {
      await generateSpeech(textToRead);
    } catch (err) {
      console.error('Failed to generate speech:', err);
      setError("Failed to generate speech: " + err.message);
    } finally {
      setIsReading(false);
    }
  };

  if (loading) {
    return <div className="text-center pt-32 text-2xl font-semibold">Loading product details...</div>;
  }

  if (error && !product) {
    return <div className="text-center pt-32 text-red-500 text-2xl font-semibold">Error loading product: {error}</div>;
  }

  if (!product) {
    return <div className="text-center pt-32 text-2xl font-semibold">Product not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8 pt-32 min-h-screen" style={containerStyle}>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-12 flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="rounded-xl w-full h-auto object-cover shadow-inner" 
            onError={(e) => {
              e.target.src = "https://placehold.co/400x400/7c3aed/ffffff?text=Image+Not+Found";
            }}
          />
        </div>
        
        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-violet-800 mb-2">{product.title}</h1>
          <p className="text-xl text-gray-600 mb-4 capitalize">{product.category}</p>
          <p className="text-3xl font-extrabold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
          
          {/* Error Display */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="font-semibold">⚠️ Error:</p>
              <p>{error}</p>
            </div>
          )}
          
          {/* AI Action Buttons */}
          <div className="flex flex-col gap-4 mb-6">
            <button
              onClick={handleGenerateDescription}
              disabled={isGenerating}
              className="px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? "Generating..." : "Generate AI Description ✨"}
            </button>
            
            <button
              onClick={handleReadDescription}
              disabled={isReading || (!generatedDescription && !product.description)}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isReading ? "Reading..." : "Read Description Aloud 🔊"}
            </button>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description:</h3>
            <div className="text-gray-700 text-base leading-relaxed bg-gray-50 p-4 rounded-lg">
              <p>{generatedDescription || product.description}</p>
              {generatedDescription && (
                <p className="text-sm text-green-600 mt-2 italic">✨ AI Generated Description</p>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-4 items-center">
            <button
              onClick={() => addToCart(product)}
              className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300 font-semibold"
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition duration-300 font-semibold"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
