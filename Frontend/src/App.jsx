import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/about" element={<AboutUs />} />
      </Route>
    </Routes>
  );
}

export default App;
