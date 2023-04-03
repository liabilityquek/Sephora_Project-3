import React from "react";
import Home from "../components/Home";
import { Routes, Route } from "react-router";
import NavBar from "../components/NavBar";
import AppointmentPage from "./Appoinments/AppointmentPage";
import ProductsPage from "./Products/ProductsPage";
import "../index.css";
import { useEffect, useState } from "react";
import SelectedProductPage from "./Products/SelectedProductPage";
import "bootstrap/dist/css/bootstrap.min.css";
import InventoryManagement from "./InventoryManagement/InventoryManagement";
import AddProducts from "./ProductsForm/AddProducts";
import AddProductsForm from "./ProductsForm/AddProductsForm";

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
          element={<SelectedProductPage products={products} />}/>
        <Route path="/productpage" element={<AddProducts products={products} />} />
        <Route path="/productpage/new" element={<AddProductsForm/>} />
        <Route path="/adminlocation" element={<InventoryManagement />} />
      </Routes>
    </main>
  );
}

export default App;
