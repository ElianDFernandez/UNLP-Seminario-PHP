import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "../components/NavBarComponent";
import Header from "../components/HeaderComponent";
import Footer from "../components/FooterComponent";

import "../assets/styles/estilosGenerales.css";

import TipoPropiedadPage from "../pages/tipoPropiedad/TipoPropiedadPage";
import NewTipoPropiedadPage from "../pages/tipoPropiedad/NewTipoPropiedadPage";
import EditTIpoPropiedadPage from "../pages/tipoPropiedad/EditTIpoPropiedadPage";

import InquilinoPage from "../pages/inquilino/InquilinoPage";
import NewInquilinoPage from "../pages/inquilino/NewInquilinoPage";
import EditInquilinoPage from "../pages/inquilino/EditInquilinoPage";

import LocalidadPage from "../pages/localidad/LocalidadPage";
import NewLocalidadPage from "../pages/localidad/NewLocalidadPage";
import EditLocalidadPage from "../pages/localidad/EditLocalidadPage";

import ReservaPage from "../pages/reserva/ReservaPage";
import NewReservaPage from "../pages/reserva/NewReservaPage";
import EditReservaPage from "../pages/reserva/EditReservaPage";

import PropiedadPage from "../pages/propiedad/PropiedadPage";
import NewPropiedadPage from "../pages/propiedad/NewPropiedadPage";
import EditPropiedadPage from "../pages/propiedad/EditPropiedadPage";
import DetailPropiedadPage from "../pages/propiedad/DetailPropiedadPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <NavBar />
      <Routes>
        {/* Rutas de la aplicación */}
        <Route path="/tipo-propiedades" element={<TipoPropiedadPage />} />
        <Route
          path="/tipo-propiedades/new"
          element={<NewTipoPropiedadPage />}
        />
        <Route
          path="/tipo-propiedades/edit/:id"
          element={<EditTIpoPropiedadPage />}
        />

        <Route path="/inquilinos" element={<InquilinoPage />} />
        <Route path="/inquilinos/new" element={<NewInquilinoPage />} />
        <Route path="/inquilinos/edit/:id" element={<EditInquilinoPage />} />

        <Route path="/localidades" element={<LocalidadPage />} />
        <Route path="/localidades/new" element={<NewLocalidadPage />} />
        <Route path="/localidades/edit/:id" element={<EditLocalidadPage />} />

        <Route path="/reservas" element={<ReservaPage />} />
        <Route path="/reservas/new" element={<NewReservaPage />} />
        <Route path="/reservas/edit/:id" element={<EditReservaPage />} />

        <Route path="/" element={<PropiedadPage />} />
        <Route path="/propiedades/new" element={<NewPropiedadPage />} />
        <Route path="/propiedades/edit/:id" element={<EditPropiedadPage />} />
        <Route path="/propiedades/:id" element={<DetailPropiedadPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
