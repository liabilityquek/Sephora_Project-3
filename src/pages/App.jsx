import React from "react";
import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@popperjs/core/dist/umd/popper.min.js";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";
import AppointmentPage from "./Appoinments/AppointmentPage";
import ProductsPage from "./Products/ProductsPage";
import SelectedProductPage from "./Products/SelectedProductPage";
import AddProductsForm from "./ProductsForm/AddProductsForm";
import InventoryManagement from "./InventoryManagement/InventoryManagement";
import InventoryAdd from "./InventoryAdd/InventoryAdd";
import EditProductsForm from "./ProductsForm/EditProductsForm";
import ProductsForm from "./ProductsForm/ProductsForm";

import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [sortByCategory, setSortByCategory] = useState("");
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);

  const addProduct = (product, error) => {
    if (error) {
      // Handle the error, e.g. display an error message
      console.error(error);
      return;
    }
    // Add the product to the products list
    setProducts(products.concat(product));
  };
  const delProduct = (id) =>
    setProducts(products.filter(({ _id }) => _id !== id));

  const handleEditProduct = (editedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === editedProduct._id ? editedProduct : product
      )
    );
  };

  useEffect(() => {
    const categories = [...new Set(products.map((p) => p.category))];
    setCategory(categories);

    const brands = [...new Set(products.map((p) => p.brand))];
    setBrand(brands);
  }, [products]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main className="App">
      <Header />
      <div className="nav-bar-container">
        <NavBar />
      </div>
      <Routes>
        <Route path="/booking" element={<AppointmentPage />} />
        <Route
          path="/"
          element={
            <ProductsPage
              products={products}
              category={category}
              sortByCategory={sortByCategory}
              setSortByCategory={setSortByCategory}
            />
          }
        />
        <Route
          path="/products/:productName"
          element={<SelectedProductPage products={products} />}
        />
        <Route
          path="/productpage"
          element={<ProductsForm products={products} delProduct={delProduct} />}
        />
        <Route
          path="/productpage/new"
          element={
            <AddProductsForm
              products={products}
              addProduct={addProduct}
              category={category}
              brand={brand}
            />
          }
        />
        <Route
          path="/productpage/products/:productID/edit"
          element={
            <EditProductsForm
              products={products}
              category={category}
              brand={brand}
              handleEditProduct={handleEditProduct}
            />
          }
        />
        <Route path="/adminlocation" element={<InventoryManagement />} />
        <Route path="/adminlocation/edit" element={<InventoryAdd />} />
      </Routes>
    </main>
  );
}

export default App;
