import React from "react";
import Home from "../components/Home";
import { Routes, Route } from "react-router";
import NavBar from "../components/NavBar";
import AppointmentPage from "./Appoinments/AppointmentPage"

function App() {

  return (
    <main className="App">
        <NavBar />
        <Routes>
          <Route path="/booking" element={<AppointmentPage/>} />
        </Routes>
        <Home />
      </main>

  )
}

export default App
