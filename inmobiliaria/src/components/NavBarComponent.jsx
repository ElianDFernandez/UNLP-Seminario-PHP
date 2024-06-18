import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Inicio
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/tipo-propiedades" className="nav-link">
            Tipo Propiedades
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/inquilinos" className="nav-link">
            Inquilinos
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/localidades" className="nav-link">
            Localidades
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/reservas" className="nav-link">
            Reservas
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/propiedades" className="nav-link">
            Propiedades
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
