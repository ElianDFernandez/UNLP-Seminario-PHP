import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Propiedades from './pages/Propiedades';
import TiposPropiedad from './pages/TiposPropiedad';  
import Reservas from './pages/Reservas';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <h1>¡Bienvenido a PipoPropiedades!</h1>
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Propiedades" element={<Propiedades />} />
        <Route path="/TiposPropiedades" element={<TiposPropiedad />} />
        <Route path="/Reservas" element={<Reservas />} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
