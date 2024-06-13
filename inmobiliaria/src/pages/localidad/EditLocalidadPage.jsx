import React, { useState } from "react";
import { useFindById, useEnviarForm } from "../../utils/function.js";
import { useNavigate } from "react-router-dom";
import { urlLocalidad } from "../../config/general-config.js";

const EditLocalidadPage = () => {
  const navigate = useNavigate();
  const id = window.location.pathname.split("/").pop();
  const { data, fetchData } = useFindById(`${urlLocalidad}/${id}`);
  const [nombre, setNombre] = useState(data && data.nombre);
  const { mensaje, enviarForm } = useEnviarForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = {
      nombre: nombre,
    };
    const updateUrl = `${urlLocalidad}/${id}`;
    setLoading(true);
    await enviarForm(form, updateUrl, "PUT", fetchData);
    setLoading(false);
    setNombre("");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="App">
      <h1>Editar Localidad</h1>
      {mensaje && <p>{mensaje}</p>}
      {!data ? (
        <p>Cargando datos...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              defaultValue={data.nombre}
              placeholder={data.nombre}
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              disabled={loading}
              required
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

export default EditLocalidadPage;
