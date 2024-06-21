import React from "react";
import Pipo from "../assets/images/pipo.png";

const HeaderComponent = () => {
  return (
    <header className="Header">
      <img src={Pipo} className="App-logo" alt="logo" />
      <h1>Pipo Propiedades</h1>
    </header>
  );
};

export default HeaderComponent;
