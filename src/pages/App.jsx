import React from "react";
import Home from "../components/Home";
import { Routes, Route } from "react-router";
import NavBar from "../components/NavBar";
import AppointmentPage from "./Appoinments/AppointmentPage";
import "bootstrap/dist/css/bootstrap.min.css";
import InventoryManagement from "./InventoryManagement/InventoryManagement";

function App() {
  return (
    <main className="App">
      <NavBar />
      <Home />
      <Routes>
        <Route path="/booking" element={<AppointmentPage />} />
        <Route path="/adminlocation" element={<InventoryManagement />} />
      </Routes>
    </main>
  );
}

export default App;
