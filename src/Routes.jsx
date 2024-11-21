import React from "react";
import { Route, Routes } from "react-router-dom";
    import Home from "./pages/Home";
    import Customers from "./pages/Customers";
function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/customers" element={<Customers />} />
    </Routes>
  );
}

export default Routing;
