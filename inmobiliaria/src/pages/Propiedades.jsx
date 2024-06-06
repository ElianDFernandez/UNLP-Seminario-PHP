import React, { useEffect, useState } from "react";
import Boton from "../components/commons/Boton";
import { Apiget } from "../utils/api";
import Propiedad from "../components/Propiedad"; // Asegúrate de importar el componente Propiedad desde la ubicación correcta

const Propiedades = () => {
  const [propiedades, setPropiedades] = useState([]);

  useEffect(() => {
    Apiget("http://localhost:80/propiedades/null/null/null/null")
      .then((data) => {
        console.log("Datos recibidos:", data); // Verifica que recibes los datos correctamente
        setPropiedades(data);
      })
      .catch((error) => console.error("Error obteniendo propiedades:", error));
  }, []);

  const crearPropiedad = () => {
    console.log("crearPropiedad");
  };

  return (
    <div>
      <h1>Listado de Propiedades</h1>
      {propiedades.length > 0 ? (
        propiedades.map((propiedad) => (
          <Propiedad key={propiedad.id} propiedad={propiedad} />
        ))
      ) : (
        <p>No hay propiedades disponibles</p>
      )}
      <Boton texto="Nueva Propiedad" onClick={crearPropiedad} />
    </div>
  );
};

export default Propiedades;
