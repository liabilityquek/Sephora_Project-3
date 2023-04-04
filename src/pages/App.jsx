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
import AddProducts from "./ProductsForm/ProductsForm";
import AddProductsForm from "./ProductsForm/AddProductsForm";
import EditProductsForm from "./ProductsForm/EditProductsForm";

function App() {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => setProducts(products.concat(product));



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
        <Route path="/productpage/new" element={<AddProductsForm addProduct={addProduct}/>} />
        <Route path="/productpage/products/:productID/edit" element={<EditProductsForm products={products}/>} />
        <Route path="/adminlocation" element={<InventoryManagement />} />
      </Routes>
    </main>
  );
}

export default App;
