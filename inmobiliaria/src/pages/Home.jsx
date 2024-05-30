import React from 'react';
import { useState } from 'react';
import logo from '../logo.svg';

const Home = () => {
    const [cont, setCont] = useState(0);

    function click(){
    setCont(cont + 1)
  }

    return (
        <div>
        <h1>¡Bienvenido a PipoPropiedades!</h1>
        <img src={logo} className="App-logo" alt="logo" />
        {/*<Boton texto={cont} onClick={click}></Boton>*/}
        <p>
          Propiedades
        </p>
         <p>
          tipos de Propiedades
         </p>
         <p>
          Reservas
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