import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEnviarForm } from "../../utils/function.js";
import { urlLocalidad } from "../../config/general-config.js";

const NewLocalidadPage = () => {
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const { mensaje, enviarForm } = useEnviarForm();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!nombre) {
      alert("Por favor, ingrese un nombre para la Localidad.");
      return;
    }
    const data = {
      nombre: nombre,
    };
    setLoading(true);
    await enviarForm(data, urlLocalidad);
    setLoading(false);
    setNombre("");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="App">
      <h1>Crear Localidad </h1>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={loading}
            required
          />
        </label>
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

export default NewLocalidadPage;
