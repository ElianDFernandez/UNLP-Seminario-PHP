import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "../components/NavBarComponent";
import TipoPropiedadPage from "../pages/tipoPropiedad/TipoPropiedadPage";
import NewTipoPropiedadPage from "../pages/tipoPropiedad/NewTipoPropiedadPage";
import EditTIpoPropiedadPage from "../pages/tipoPropiedad/EditTIpoPropiedadPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* Rutas de la aplicación */}
        <Route path="/tipo-propiedades" element={<TipoPropiedadPage />} />
        <Route path="/tipo-propiedades/new" element={<NewTipoPropiedadPage />} />
        <Route path="/tipo-propiedades/edit/:id" element={<EditTIpoPropiedadPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
