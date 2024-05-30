import React from "react";
import Boton from "../components/commons/Boton";
const Reservas = () => {
  const crearReserva = () => {
    console.log("crearReserva");
  };
  return (
    <div>
      <h1>Reservas</h1>
      <h3>aca irian las Reservas</h3>
      <Boton texto="nueva Reserva" onClick={crearReserva} />
    </div>
  );
};

export default Reservas;
