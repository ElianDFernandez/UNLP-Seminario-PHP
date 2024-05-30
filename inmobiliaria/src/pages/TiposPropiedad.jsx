import React from "react";
import Boton from "../components/commons/Boton";

const TiposPropiedad = () => {
  const crearTipoPropiedad = () => {
    console.log("crearPropiedad");
  };
  return (
    <div>
      <h1>TiposPropiedad</h1>
      <h3>aca irian los tipos de propiedades </h3>
      <Boton texto="nuevo Tipo de Propiedad" onClick={crearTipoPropiedad} />
    </div>
  );
};

export default TiposPropiedad;
