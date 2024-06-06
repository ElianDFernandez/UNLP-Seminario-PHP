import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/styles.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Propiedades from "./pages/propiedades/PropiedadesPage";
import TiposPropiedad from "./pages/tipoPropiedad/TiposPropiedadPage";
import Reservas from "./pages/reservas/ReservasPage";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import NavBarComponent from "./components/NavBarComponent";
import EditarTiposPropiedad from "./pages/tipoPropiedad/EditarTiposPropiedadPage";
import newTipoPropiedad from "./pages/tipoPropiedad/newTipoPropiedadPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HeaderComponent />
      <NavBarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Propiedades" element={<Propiedades />} />
        <Route path="/TiposPropiedad" element={<TiposPropiedad />} />
        <Route path="/Reservas" element={<Reservas />} />
        <Route
          path="/TiposPropiedad/EditarTipoPropiedad"
          element={<EditarTiposPropiedad />}
        />
        <Route
          path="/TiposPropiedad/newTipoPropiedad"
          element={<newTipoPropiedad />}
        />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
