import React from "react";
import Home from "../components/Home";
import { Routes, Route } from "react-router";
import NavBar from "../components/NavBar";
import AppointmentPage from "./Appoinments/AppointmentPage"
import ProductsPage from "./Products/ProductsPage";
import "../index.css"
import { useEffect, useState } from "react";
import SelectedProductPage from "./Products/SelectedProductPage";

function App() {

  const [products, setProducts] = useState([]);

    useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main className="App">
        <NavBar />
        <Routes>
          <Route path="/booking" element={<AppointmentPage/>} />
          <Route path="/" element={<ProductsPage products={products}/>} />
         <Route path="/product/:productName" element={<SelectedProductPage products={products}/>} />
        </Routes>
        <Home />
      </main>

  )
}

export default App
