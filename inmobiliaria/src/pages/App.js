import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "../components/NavBarComponent";

import TipoPropiedadPage from "../pages/tipoPropiedad/TipoPropiedadPage";
import NewTipoPropiedadPage from "../pages/tipoPropiedad/NewTipoPropiedadPage";
import EditTIpoPropiedadPage from "../pages/tipoPropiedad/EditTIpoPropiedadPage";

import InquilinoPage from "../pages/inquilino/InquilinoPage";
import NewInquilinoPage from "../pages/inquilino/NewInquilinoPage";
import EditInquilinoPage from "../pages/inquilino/EditInquilinoPage";

import LocalidadPage from "../pages/localidad/LocalidadPage";
import NewLocalidadPage from "../pages/localidad/NewLocalidadPage";
import EditLocalidadPage from "../pages/localidad/EditLocalidadPage";

function App() {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}
export default App;
