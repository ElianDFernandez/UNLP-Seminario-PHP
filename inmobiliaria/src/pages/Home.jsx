import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Boton from "../components/commons/Boton";

const Home = () => {
  const [cont, setCont] = useState(0);

  function click() {
    setCont(cont + 1);
  }

  return (
    <div className="home">
      <h1>¡Bienvenido a PipoPropiedades!</h1>
      <Boton texto={cont} onClick={click} />
    </div>
  );
};
export default Home;
