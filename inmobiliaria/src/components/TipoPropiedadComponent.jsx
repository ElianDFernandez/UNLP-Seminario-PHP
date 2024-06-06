import React from "react";
import "../assets/styles/components/propiedad.css";

const TipoPropiedad = ({ TipoPropiedad }) => {
  return (
    <div>
      <p>{TipoPropiedad.nombre}</p>
    </div>
  );
};

export default TipoPropiedad;
