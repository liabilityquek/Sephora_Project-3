import React from "react";
import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@popperjs/core/dist/umd/popper.min.js";
import Header from "../components/Header/Header";
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

export default function App() {
  const [user, setUser] = useState(getUser());
  const [products, setProducts] = useState([]);
  const [sortByCategory, setSortByCategory] = useState("");
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const token = localStorage.getItem("token");
  const customer = token ? JSON.parse(window.atob(token.split(".")[1])) : null;

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

  const productsPageRoutes = [
    {
      path: "/",
      element: (
        <ProductsPage
          products={products}
          category={category}
          sortByCategory={sortByCategory}
          setSortByCategory={setSortByCategory}
        />
      ),
    },
    {
      path: "/products/:productName",
      element: <SelectedProductPage products={products} />,
    },
  ];

  const accessDeniedComponent = <div>Access denied</div>;

  const customerPagesRoutes = [
    ...productsPageRoutes,
    {
      path: "/maps",
      element: <Map />,
    },
    {
      path: "/booking",
      element: <AppointmentPage />,
    },
    {
      path: "/history",
      element: <UpcomingAppointment />,
    },

    {
      path: "/admin/*",
      element: <Admin />,
    },
    {
      path: "/makeupartist/:id/*",
      element: <MakeupArtist />,
    },
    {
      path: "/makeupartist/edit/:id",
      element: <Edit />,
    },
  ];

  const adminRouteConfig = [
    ...productsPageRoutes,
    ...customerPagesRoutes,
    {
      path: "/productpage",
      element: <ProductsForm products={products} delProduct={delProduct} />,
    },
    {
      path: "/productpage/new",
      element: (
        <AddProductsForm
          products={products}
          addProduct={addProduct}
          category={category}
          brand={brand}
        />
      ),
    },
    {
      path: "/productpage/products/:productID/edit",
      element: (
        <EditProductsForm
          products={products}
          category={category}
          brand={brand}
          handleEditProduct={handleEditProduct}
        />
      ),
    },
    {
      path: "/adminlocation",
      element: <InventoryManagement />,
    },
    {
      path: "/adminlocation/edit",
      element: <InventoryAdd />,
    },
  ];

  const loggedInRoleSpecificRoutes = [
    {
      role: "ADMIN",
      content: (
        <Routes>
          {adminRouteConfig.map((config) => (
            <Route {...config} />
          ))}
        </Routes>
      ),
    },
    {
      role: "CUSTOMER",
      content: (
        <Routes>
          {customerPagesRoutes.map((config) => (
            <Route {...config} />
          ))}
          <Route path="*" element={accessDeniedComponent} />
        </Routes>
      ),
    },
  ];

  const renderAuthenticatedPages = (cust) =>
    loggedInRoleSpecificRoutes.find((config) => config.role === cust.role)
      ?.content;

  const renderUnauthenticatedPages = () => (
    <React.Fragment>
      <AuthPage setUser={setUser} />
      <Routes>
        <Route path="/maps" element={<Map />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/makeupartist/:id/*" element={<MakeupArtist />} />
        {productsPageRoutes.map((config) => (
          <Route {...config}></Route>
        ))}
        {customerPagesRoutes.map((config) => (
          <Route path={config.path} element={<div>Please login</div>} />
        ))}
        {adminRouteConfig.map((config) => (
          <Route path={config.path} element={accessDeniedComponent} />
        ))}
      </Routes>
    </React.Fragment>
  );

  return (
    <main className="App">
      <Header />
      <NavBar setUser={setUser} />
      {customer
        ? renderAuthenticatedPages(customer.customer)
        : renderUnauthenticatedPages()}
    </main>
  );
}
