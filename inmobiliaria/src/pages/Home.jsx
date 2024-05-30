import React from 'react';
import { useState } from 'react';
import logo from '../logo.svg';
import { NavLink } from 'react-router-dom';
import Boton from '../components/boton';
import Pipo from '../assets/images/pipo.png';

const Home = () => {
    const [cont, setCont] = useState(0);

    function click(){
    setCont(cont + 1)
  }

    return (
        <div>
        <h1>¡Bienvenido a PipoPropiedades!</h1>
        <img src={Pipo} className="App-logo" alt="logo" />
        <Boton texto={cont} onClick={click}></Boton>
        <p>
          <NavLink to="/Propiedades">Propiedades</NavLink>
        </p>
        <p>
          <NavLink to="/TiposPropiedad">Tipos De Propiedad</NavLink>
         </p>
         <p>
          <NavLink to="/Reservas">Reservas</NavLink>
         </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        </div>

    );
};

export default Home;