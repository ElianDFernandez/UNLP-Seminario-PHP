import React from "react";
import Boton from "../../components/commons/Boton";
import { useState, useEffect } from "react";
import { Apiget } from "../../utils/api";

const Reservas = () => {
  const crearReserva = () => {
    console.log("crearReserva");
  };
  const [Reservas, setReservas] = useState([]);

  useEffect(() => {
    Apiget("http://localhost:80/reservas").then((data) => {
      console.log(data);
      if (Array.isArray(data)) {
        setReservas(data);
      } else {
        console.error("Data is not an array:", data);
      }
    });
  }, []);

  return (
    <div>
      <h1>Reservas</h1>
      {Reservas.map((res, index) => (
        <div key={index}>
          <p>{res.fecha_inicio}</p>
        </div>
      ))}
      <Boton texto="nueva Reserva" onClick={crearReserva} />
    </div>
  );
};

export default Reservas;
