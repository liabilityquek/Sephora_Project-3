import React from "react";
import Home from "../components/Home";
import { Routes, Route } from "react-router";
import NavBar from "../components/NavBar";
import AppointmentPage from "./Appoinments/AppointmentPage"
import ProductsPage from "./Product/ProductsPage";

function App() {

  return (
    <main className="App">
        <NavBar />
        <Routes>
          <Route path="/booking" element={<AppointmentPage/>} />
          <Route path="/" element={<ProductsPage/>} />
        </Routes>
        <Home />
      </main>

  )
}

export default App
