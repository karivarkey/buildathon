import React from "react";
import Home from "./components/home/index"; // Import the Home component
import { BrowserRouter, Routes,Route } from "react-router-dom";
// import Navbar from "./components/Navbar";  // Import the Navbar component

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' Component={Home}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
