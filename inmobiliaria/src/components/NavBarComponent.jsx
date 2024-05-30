import { NavLink } from "react-router-dom";

const NavBarComponent = () => {
  return (
    <div className="NavBarclass">
      <p>
        <NavLink to="/Propiedades">Propiedades</NavLink>
      </p>
      <p>
        <NavLink to="/TiposPropiedad">Tipos De Propiedad</NavLink>
      </p>
      <p>
        <NavLink to="/Reservas">Reservas</NavLink>
      </p>
    </div>
  );
};
export default NavBarComponent;
