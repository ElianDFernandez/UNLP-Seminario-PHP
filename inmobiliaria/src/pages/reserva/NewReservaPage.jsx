import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEnviarForm } from "../../utils/function.js";
import { urlReserva } from "../../config/general-config.js";

const NewReservaPage = () => {
  const [inquilino, setInquilino] = useState("");
  const [propiedad, setPropiedad] = useState("");
  const [fecha_desde, setFecha] = useState("");
  const [cant_noches, setNoches] = useState("");
  const [valor_total, setValor] = useState("");
  const [loading, setLoading] = useState(false);
  const { mensaje, enviarForm } = useEnviarForm();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      inquilino_id: inquilino,
      propiedad_id: propiedad,
      fecha_desde: fecha_desde,
      cantidad_noches: cant_noches,
    };
    setLoading(true);
    await enviarForm(data, urlReserva);
    setLoading(false);
    setInquilino("");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="App">
      <h1>Crear Reserva</h1>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Inquilino:
          <input
            type="text"
            value={inquilino}
            onChange={(e) => setInquilino(e.target.value)}
            disabled={loading}
          />
        </label>
        <label>
          Propiedad:
          <input
            type="text"
            value={propiedad}
            onChange={(e) => setPropiedad(e.target.value)}
            disabled={loading}
          />
        </label>
        <label>
          Cantidad de Noches:
          <input
            type="text"
            value={cant_noches}
            onChange={(e) => setNoches(e.target.value)}
            disabled={loading}
          />
        </label>
        <label>
          Fecha de Inicio
          <input
            type="text"
            value={fecha_desde}
            onChange={(e) => setFecha(e.target.value)}
            disabled={loading}
          />
        </label>
        <label>Valor Total: </label>
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Crear"}
        </button>
        <button type="button" onClick={handleGoBack} disabled={loading}>
          Volver
        </button>
      </form>
    </div>
  );
};

export default NewReservaPage;
