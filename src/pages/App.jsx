import React from "react";
import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@popperjs/core/dist/umd/popper.min.js";
import NavBar from "../components/NavBar";
import AppointmentPage from "./Appoinments/AppointmentPage";
import Map from "./Map/Map";
import SignUpForm from "./AuthPage/SignUpForm";
import UpcomingAppointment from "./UpcomingAppointment/UpcomingAppointment";
import Admin from "./MakeupAdmin/Admin";
import MakeupArtist from "./MakeupAdmin/MakeupArtist";
import Edit from "./MakeupAdmin/Edit";
import AuthPage from "./AuthPage/AuthPage";
import { getUser } from "../utilities/users-service";

import SelectedProductPage from "./Products/SelectedProductPage";
import AddProductsForm from "./ProductsForm/AddProductsForm";
import InventoryManagement from "./InventoryManagement/InventoryManagement";
import InventoryAdd from "./InventoryAdd/InventoryAdd";
import EditProductsForm from "./ProductsForm/EditProductsForm";
import ProductsForm from "./ProductsForm/ProductsForm";
import ProductsPage from "./Products/ProductsPage";

import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(getUser());
  const [products, setProducts] = useState([]);
  const [sortByCategory, setSortByCategory] = useState("");
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);

  const addProduct = (product) => setProducts(products.concat(product));
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

  if (user === null) {
    return (
      <main className="App">
        <NavBar />
        <AuthPage setUser={setUser} />
        <Routes>
          <Route path="/maps" element={<Map />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/makeupartist/:id/*" element={<MakeupArtist />} />
        </Routes>
      </main>
    );
  } else {
    return (
      <main className="App">
        <NavBar setUser={setUser} />
        <Routes>
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
            element={
              <ProductsForm products={products} delProduct={delProduct} />
            }
          />
          <Route
            path="/productpage/new"
            element={
              <AddProductsForm
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

          <Route path="/maps" element={<Map />} />
          <Route path="/booking" element={<AppointmentPage />} />
          <Route path="/history" element={<UpcomingAppointment />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/makeupartist/:id/*" element={<MakeupArtist />} />
          <Route path={`/makeupartist/edit/:id`} element={<Edit />} />
        </Routes>
      </main>
    );
  }
}

export default App;
