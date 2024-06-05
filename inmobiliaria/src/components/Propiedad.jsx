import React from "react";
import "../assets/styles/components/propiedad.css";

const Propiedad = ({ propiedad }) => {
  return (
    <div className="propiedad-detalle">
      <div className="imagen">
        <img
          src={propiedad.imagen}
          alt={propiedad.domicilio}
        />
      </div>
      <div className="texto">
        <h2>{propiedad.domicilio}</h2>
        <p>Localidad ID: {propiedad.localidad_id}</p>
        <p>Cantidad de huéspedes: {propiedad.cantidad_huespedes} Cantidad de habitaciones: {propiedad.cantidad_habitaciones} Cantidad de baños: {propiedad.cantidad_banios} Cochera: {propiedad.cochera ? "Sí" : "No"}</p> 
        <p>Fecha inicio disponibilidad: {propiedad.fecha_inicio_disponibilidad} Cantidad de días: {propiedad.cantidad_dias}</p>
        <p>Disponible: {propiedad.disponible ? "Sí" : "No"}</p>
        <p>Valor por noche: {propiedad.valor_noche}</p>
        <p>Tipo de propiedad ID: {propiedad.tipo_propiedad_id}</p>
      </div>
    </div>
  );
};

export default Propiedad;