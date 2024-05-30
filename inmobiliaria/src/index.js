import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/styles.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Propiedades from "./pages/Propiedades";
import TiposPropiedad from "./pages/TiposPropiedad";
import Reservas from "./pages/Reservas";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import NavBarComponent from "./components/NavBarComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HeaderComponent />
      <NavBarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Propiedades" element={<Propiedades />} />
        <Route path="/TiposPropiedades" element={<TiposPropiedad />} />
        <Route path="/Reservas" element={<Reservas />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
