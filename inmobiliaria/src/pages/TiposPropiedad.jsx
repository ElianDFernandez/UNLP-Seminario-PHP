import React from "react";
import Boton from "../components/commons/Boton";
import { useState, useEffect } from "react";
import { Apiget } from "../utils/api";
import TipoPropiedad from "../components/TipoPropiedadComponent";

const TiposPropiedad = () => {
  const [TiposPropiedad, setTiposPropiedad] = useState([]);

  const crearTipoPropiedad = () => {
    console.log("crearPropiedad");
  };

  useEffect(() => {
    Apiget("http://localhost/tipos_propiedad").then((data) => {
      console.log(data);
      if (Array.isArray(data)) {
        setTiposPropiedad(data);
      } else {
        console.error("Data is not an array:", data);
      }
    });
  }, []);

  return (
    <div>
      <h1>TiposPropiedad</h1>

      {TiposPropiedad.length > 0 ? (
        TiposPropiedad.map((tipoPropiedades) => (
          <TipoPropiedad
            key={tipoPropiedades.id}
            tipoPropiedades={tipoPropiedades}
          />
        ))
      ) : (
        <p>No hay Tipos de propiedad disponibles</p>
      )}
      <Boton texto="nuevo Tipo de Propiedad" onClick={crearTipoPropiedad} />
    </div>
  );
};

export default TiposPropiedad;
