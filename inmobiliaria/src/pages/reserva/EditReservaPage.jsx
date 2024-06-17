import React, { useState } from "react";
import { useFindById, useEnviarForm } from "../../utils/function.js";
import { useNavigate } from "react-router-dom";
import { urlReserva } from "../../config/general-config.js";

const EditReservaPage = () => {
  const navigate = useNavigate();
  const id = window.location.pathname.split("/").pop();
  const [inquilino, setInquilino] = useState("");
  const [propiedad, setPropiedad] = useState("");
  const [fecha_desde, setFecha] = useState("");
  const [cant_noches, setNoches] = useState("");
  const [valor_total, setValor] = useState(true);
  const { data, fetchData } = useFindById(`${urlReserva}/${id}`);
  const { mensaje, enviarForm } = useEnviarForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = {
      inquilino_id: inquilino,
      propiedad_id: propiedad,
      fecha_desde: fecha_desde,
      cantidad_noches: cant_noches,
    };
    const updateUrl = `${urlReserva}/${id}`;
    setLoading(true);
    await enviarForm(form, updateUrl, "PUT", fetchData);
    setLoading(false);
    setInquilino("");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="App">
      <h1>Editar Inquilino</h1>
      {mensaje && <p>{mensaje}</p>}
      {!data ? (
        <p>Cargando datos...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Inquilino:
            <input
              type="text"
              placeholder={data.nombre}
              value={inquilino}
              onChange={(event) => setInquilino(event.target.value)}
              disabled={loading}
            />
          </label>
          <label>
            Propiedad:
            <input
              type="text"
              placeholder={data.apellido}
              value={propiedad}
              onChange={(event) => setPropiedad(event.target.value)}
              disabled={loading}
            />
          </label>
          <label>
            Fecha Desde
            <input
              type="text"
              placeholder={data.documento}
              value={fecha_desde}
              onChange={(event) => setFecha(event.target.value)}
              disabled={loading}
            />
          </label>
          <label>
            Cantidad de Noches:
            <input
              type="text"
              placeholder={data.email}
              value={cant_noches}
              onChange={(event) => setNoches(event.target.value)}
              disabled={loading}
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Guardar"}
          </button>
          <button type="button" onClick={handleGoBack} disabled={loading}>
            Volver
          </button>
        </form>
      )}
    </div>
  );
};

export default EditReservaPage;
