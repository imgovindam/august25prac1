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
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import ProductDetail from "./components/ProductDetail";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
 const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="will-change-transform min-w-max">

   <Router>
      <Navbar search={search} currentPage={currentPage} setCurrentPage={setCurrentPage} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Card search={search} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>

    </div>
 
  );
}

export default App;
