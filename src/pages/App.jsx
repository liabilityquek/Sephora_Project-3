import React from "react";
import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@popperjs/core/dist/umd/popper.min.js";
import Home from "../components/Home";
import NavBar from "../components/NavBar";
import AppointmentPage from "./Appoinments/AppointmentPage";
import ProductsPage from "./Products/ProductsPage";
import SelectedProductPage from "./Products/SelectedProductPage";
import AddProducts from "./ProductsForm/ProductsForm";
import AddProductsForm from "./ProductsForm/AddProductsForm";
import InventoryManagement from "./InventoryManagement/InventoryManagement";
import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";

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
      <Home />
      <Routes>
        <Route path="/booking" element={<AppointmentPage />} />
        <Route path="/" element={<ProductsPage products={products} />} />
        <Route
          path="/products/:productName"
          element={<SelectedProductPage products={products} />}
        />
        <Route
          path="/productpage"
          element={<AddProducts products={products} />}
        />
        <Route path="/productpage/new" element={<AddProductsForm />} />
        <Route path="/adminlocation" element={<InventoryManagement />} />
      </Routes>
    </main>
  );
}

export default App;
