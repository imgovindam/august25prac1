// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Drawer } from "antd";
// import { pcmToWav } from "../utils/audioUtils";



// const Navbar = ({ search, setSearch, cartCount ,darkMode,handleDarkMode}) => {
//   const navigate = useNavigate();
//   const [isListening, setIsListening] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
 
//   const handleVoiceSearch = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       console.error("Speech Recognition is not supported by this browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.interimResults = false;
//     recognition.lang = 'en-US';

//     recognition.onstart = () => {
//       setIsListening(true);
//       console.log('Voice search started...');
//     };

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setSearch(transcript);
//       console.log('Transcript:', transcript);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//       console.log('Voice search ended.');
//     };

//     recognition.onerror = (event) => {
//       console.error('Speech recognition error:', event.error);
//       setIsListening(false);
//     };

//     recognition.start();
//   };

//   const handleTextToSpeech = async () => {
//     if (!search || isSpeaking) return;

//     setIsSpeaking(true);
//     try {
//       const apiKey = "";
//       const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;
//       const payload = {
//         contents: [{ parts: [{ text: search }] }],
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
//     } finally {
//       setIsSpeaking(false);
//     }
//   };


  
//   return (
//     <header className="bg-[#FBFBFB] shadow-xl  shadow-violet-100 p-6 flex flex-col md:flex-row justify-between items-center fixed w-full top-0 z-100">
//       <div className="flex justify-between w-full md:w-auto">
//         <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//           </svg>
//           <h1 className="text-3xl font-bold text-gray-800">ShopSphere</h1>
//         </div>
//         <div className="md:hidden flex items-center space-x-4">
//           <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.182 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//             </svg>
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//               {cartCount}
//             </span>
//           </div>
//         </div>
//       </div>

//        <div>
    
//     </div>
//       <div className="flex-1 max-w-lg mx-auto md:mx-4 mt-4 md:mt-0 w-full flex items-center gap-2">
//         <input
//           type="text"
//           placeholder="Search for products..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-300 shadow-sm"
//         />
//         <button
//           onClick={handleVoiceSearch}
//           className={`p-2 rounded-full transition-all duration-300 transform ${
//             isListening ? 'bg-red-500 text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
//           }`}
//           aria-label="Voice Search"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={2}
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M12 18.75a6 6 0 0 0 6-6v-1.5a6 6 0 1 0-12 0v1.5a6 6 0 0 0 6 6Z"
//             />
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 9.75a7.5 7.5 0 0 1 15 0"
//             />
//           </svg>
//         </button>
//         <button
//           onClick={handleTextToSpeech}
//           disabled={isSpeaking || !search}
//           className={`p-2 rounded-full transition-all duration-300 transform ${
//             isSpeaking ? 'bg-indigo-500 text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
//           }`}
//           aria-label="Read Search Text"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={2}
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25V6.75A2.25 2.25 0 0 1 9 4.5h3.75m-3.75 3.75h3.75m-3.75 3.75h3.75M9 15.75H6.75a2.25 2.25 0 0 1-2.25-2.25V10.5M4.5 9.75a7.5 7.5 0 0 1 15 0"
//             />
//           </svg>
//         </button>


//            <button className="cursor-pointer text-4xl" onClick={handleDarkMode}>
//        {darkMode ? "🌑" : "☀️"}
//         </button>
//       </div>
//       <div className="hidden md:flex items-center space-x-6 mt-4 md:mt-0">
//         <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.182 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//           </svg>
//           <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//               {cartCount}
//             </span>
//           </div>
//         </div>
//       </header>
//     );
//   };




// export default Navbar;


// **** with text to speech & speech to text using native web speech api******

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Drawer } from "antd";
// // import { pcmToWav } from "../utils/audioUtils"; // <-- Not needed with native TTS

// // NOTE: The utility function 'pcmToWav' and the external API call 
// // have been replaced by the browser's native SpeechSynthesis API for reliability.

// const Navbar = ({ search, setSearch, cartCount ,darkMode,handleDarkMode}) => {
//   const navigate = useNavigate();
//   const [isListening, setIsListening] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
 
//   const handleVoiceSearch = () => {
//     // Standard Speech-to-Text (STT) logic remains the same
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       console.error("Speech Recognition is not supported by this browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.interimResults = false;
//     recognition.lang = 'en-US';

//     recognition.onstart = () => {
//       setIsListening(true);
//       console.log('Voice search started...');
//     };

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setSearch(transcript);
//       console.log('Transcript:', transcript);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//       console.log('Voice search ended.');
//       // Optional: Navigate to search results after voice input
//       // navigate(`/search?q=${encodeURIComponent(search)}`);
//     };

//     recognition.onerror = (event) => {
//       console.error('Speech recognition error:', event.error);
//       setIsListening(false);
//     };

//     recognition.start();
//   };

//   // 🔄 CORRECTED: Using Web Speech API (SpeechSynthesis) for reliable TTS
//   const handleTextToSpeech = () => {
//     // 1. Check for browser support and speaking state
//     if (!('speechSynthesis' in window) || !search || isSpeaking) {
//         if (!('speechSynthesis' in window)) {
//              console.error("Text-to-Speech is not supported by this browser.");
//         }
//         return;
//     }

//     setIsSpeaking(true);
    
//     // 2. Create a new utterance object
//     const utterance = new SpeechSynthesisUtterance(search);
    
//     // 3. Set event handlers
//     utterance.onend = () => {
//       setIsSpeaking(false);
//       console.log('Text-to-speech finished.');
//     };

//     utterance.onerror = (event) => {
//       console.error('Speech synthesis error:', event.error);
//       setIsSpeaking(false);
//     };
    
//     // 4. Start speaking
//     window.speechSynthesis.speak(utterance);

//     // NOTE: If you need an external API (like Google Cloud TTS) for specific voices, 
//     // you must use the correct endpoint, a valid API key for that service, 
//     // and handle the returned audio format (e.g., MP3 or WAV).
//   };


  
//   return (
//     <header className="bg-[#FBFBFB] shadow-xl  shadow-violet-100 p-6 flex flex-col md:flex-row justify-between items-center fixed w-full top-0 z-100">
//       <div className="flex justify-between w-full md:w-auto">
//         <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//           </svg>
//           <h1 className="text-3xl font-bold text-gray-800">ShopSphere</h1>
//         </div>
//         <div className="md:hidden flex items-center space-x-4">
//           <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.182 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//             </svg>
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//               {cartCount}
//             </span>
//           </div>
//         </div>
//       </div>

//        <div>
    
//     </div>
//       <div className="flex-1 max-w-lg mx-auto md:mx-4 mt-4 md:mt-0 w-full flex items-center gap-2">
//         <input
//           type="text"
//           placeholder="Search for products..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-300 shadow-sm"
//         />
//         <button
//           onClick={handleVoiceSearch}
//           className={`p-2 rounded-full transition-all duration-300 transform ${
//             isListening ? 'bg-red-500 text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
//           }`}
//           aria-label="Voice Search"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={2}
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M12 18.75a6 6 0 0 0 6-6v-1.5a6 6 0 1 0-12 0v1.5a6 6 0 0 0 6 6Z"
//             />
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 9.75a7.5 7.5 0 0 1 15 0"
//             />
//           </svg>
//         </button>
//         <button
//           onClick={handleTextToSpeech}
//           disabled={isSpeaking || !search}
//           className={`p-2 rounded-full transition-all duration-300 transform ${
//             isSpeaking ? 'bg-indigo-500 text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
//           }`}
//           aria-label="Read Search Text"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={2}
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25V6.75A2.25 2.25 0 0 1 9 4.5h3.75m-3.75 3.75h3.75m-3.75 3.75h3.75M9 15.75H6.75a2.25 2.25 0 0 1-2.25-2.25V10.5M4.5 9.75a7.5 7.5 0 0 1 15 0"
//             />
//           </svg>
//         </button>


//            <button className="cursor-pointer text-4xl" onClick={handleDarkMode}>
//        {darkMode ? "🌑" : "☀️"}
//         </button>
//       </div>
//       <div className="hidden md:flex items-center space-x-6 mt-4 md:mt-0">
//         <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.182 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//           </svg>
//           <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//               {cartCount}
//             </span>
//           </div>
//         </div>
//       </header>
//     );
//   };

// export default Navbar;


// **** with text to speech & speech to text using native web speech api******

// ***responsive navbar********


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer } from "antd";
import { pcmToWav } from "../utils/audioUtils";

const Navbar = ({ search, setSearch, cartCount, darkMode, handleDarkMode }) => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
 
  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition is not supported by this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      console.log('Voice search started...');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearch(transcript);
      console.log('Transcript:', transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log('Voice search ended.');
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  const handleTextToSpeech = async () => {
    if (!search || isSpeaking) return;

    setIsSpeaking(true);
    try {
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{ parts: [{ text: search }] }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Puck" } } },
        },
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`TTS API failed with status: ${response.status}`);
      }

      const result = await response.json();
      const part = result?.candidates?.[0]?.content?.parts?.[0];
      const audioData = part?.inlineData?.data;
      const mimeType = part?.inlineData?.mimeType;

      if (audioData && mimeType && mimeType.startsWith("audio/")) {
        const sampleRate = parseInt(mimeType.match(/rate=(\d+)/)[1], 10);
        const pcmData = Uint8Array.from(atob(audioData), c => c.charCodeAt(0)).buffer;
        const wavBlob = pcmToWav(pcmData, sampleRate);
        const audioUrl = URL.createObjectURL(wavBlob);
        new Audio(audioUrl).play();
      } else {
        throw new Error("No audio data received from TTS API.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSpeaking(false);
    }
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <>
      <header className="bg-[#FBFBFB] shadow-xl shadow-violet-100 fixed w-full top-0 z-50">
        {/* Mobile Navbar */}
        <div className="block md:hidden px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setDrawerVisible(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-gray-700"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            {/* Center Search Section */}
            <div className="flex-1 flex items-center gap-2 max-w-md mx-2">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-300"
              />
              
              <button
                onClick={handleVoiceSearch}
                className={`p-2 rounded-full transition-all duration-300 flex-shrink-0 ${
                  isListening ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5a6 6 0 1 0-12 0v1.5a6 6 0 0 0 6 6Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 9.75a7.5 7.5 0 0 1 15 0" />
                </svg>
              </button>
              
              <button
                onClick={handleTextToSpeech}
                disabled={isSpeaking || !search}
                className={`p-2 rounded-full transition-all duration-300 flex-shrink-0 ${
                  isSpeaking ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-600'
                } ${(!search) ? 'opacity-50' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25V6.75A2.25 2.25 0 0 1 9 4.5h3.75m-3.75 3.75h3.75m-3.75 3.75h3.75M9 15.75H6.75a2.25 2.25 0 0 1-2.25-2.25V10.5M4.5 9.75a7.5 7.5 0 0 1 15 0" />
                </svg>
              </button>
            </div>

            {/* Cart Icon */}
            <div className="relative cursor-pointer flex-shrink-0" onClick={() => navigate('/cart')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.182 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-800">ShopSphere</h1>
          </div>

          {/* Search Section */}
          <div className="flex-1 min-w-auto mx-8 flex items-center gap-2">
            <input
              type="text"
              placeholder="Search for products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-300 shadow-sm"
            />
            
            <button
              onClick={handleVoiceSearch}
              className={`p-3 rounded-full transition-all duration-300 transform ${
                isListening ? 'bg-red-500 text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              aria-label="Voice Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5a6 6 0 1 0-12 0v1.5a6 6 0 0 0 6 6Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 9.75a7.5 7.5 0 0 1 15 0" />
              </svg>
            </button>
            
            <button
              onClick={handleTextToSpeech}
              disabled={isSpeaking || !search}
              className={`p-3 rounded-full transition-all duration-300 transform ${
                isSpeaking ? 'bg-indigo-500 text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              } ${(!search) ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label="Read Search Text"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25V6.75A2.25 2.25 0 0 1 9 4.5h3.75m-3.75 3.75h3.75m-3.75 3.75h3.75M9 15.75H6.75a2.25 2.25 0 0 1-2.25-2.25V10.5M4.5 9.75a7.5 7.5 0 0 1 15 0" />
              </svg>
            </button>

            <button 
              className="text-4xl p-2" 
              onClick={handleDarkMode}
            >
              {darkMode ? "🌑" : "☀️"}
            </button>
          </div>

          {/* Cart */}
          <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.182 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          </div>
        </div>
      </header>

      {/* Mobile Drawer - Only Navigation & Settings */}
      <Drawer
        title={
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-lg font-bold text-gray-800">ShopSphere</span>
          </div>
        }
        placement="left"
        onClose={closeDrawer}
        open={drawerVisible}
        width={280}
      >
        <div className="flex flex-col space-y-6">
          
          {/* Navigation Menu */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Navigation</h3>
            <div className="space-y-2">
              <button
                onClick={() => {
                  navigate('/');
                  closeDrawer();
                }}
                className="w-auto text-left p-4 rounded-lg hover:bg-violet-50 hover:text-violet-700 transition-colors flex items-center gap-3 border border-transparent hover:border-violet-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="font-medium">Home</span>
              </button>
              
              <button
                onClick={() => {
                  navigate('/cart');
                  closeDrawer();
                }}
                className="w-full text-left p-4 rounded-lg hover:bg-violet-50 hover:text-violet-700 transition-colors flex items-center gap-3 justify-between border border-transparent hover:border-violet-200"
              >
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.182 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-medium">Shopping Cart</span>
                </div>
                <span className="bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {cartCount}
                </span>
              </button>

              <button
                onClick={() => {
                  // Add your wishlist navigation here
                  closeDrawer();
                }}
                className="w-full text-left p-4 rounded-lg hover:bg-violet-50 hover:text-violet-700 transition-colors flex items-center gap-3 border border-transparent hover:border-violet-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                <span className="font-medium">Wishlist</span>
              </button>

              <button
                onClick={() => {
                  // Add your profile navigation here
                  closeDrawer();
                }}
                className="w-full text-left p-4 rounded-lg hover:bg-violet-50 hover:text-violet-700 transition-colors flex items-center gap-3 border border-transparent hover:border-violet-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <span className="font-medium">Profile</span>
              </button>
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Settings</h3>
            <button
              onClick={handleDarkMode}
              className="w-full p-4 rounded-lg hover:bg-violet-50 hover:text-violet-700 transition-colors flex items-center gap-3 border border-transparent hover:border-violet-200"
            >
              <span className="text-2xl">{darkMode ? "🌑" : "☀️"}</span>
              <span className="font-medium">{darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">ShopSphere v1.0</p>
          </div>
        </div>
      </Drawer>
      
      {/* Spacer */}
      <div className="h-16 md:h-20"></div>
    </>
  );
};

export default Navbar;





