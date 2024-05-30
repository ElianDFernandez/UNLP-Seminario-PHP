import React from "react";
import Boton from "../components/commons/Boton";

const Propiedades = () => {
  const crearPropiedad = () => {
    console.log("crearPropiedad");
  };
  return (
    <div>
      <h1>Propiedades</h1>
      <h3>aca irian las Propiedades</h3>
      <Boton texto="nueva propiedad" onClick={crearPropiedad} />
    </div>
  );
};

export default Propiedades;
