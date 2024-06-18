import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEnviarForm } from "../../utils/function.js";
import { urlPropiedad } from "../../config/general-config.js";

const NewPropiedadPage = () => {
  const [domicilio, setDomicilio] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [huespedes, setHuespedes] = useState("");
  const [inicioDisponibilidad, setInicioDisponibilidad] = useState("");
  const [dias, setDias] = useState("");
  const [disponible, setDisp] = useState(false);
  const [valorNoche, setValor] = useState("");
  const [tipo, setTipo] = useState("");
  const [imagen, setImagen] = useState("");
  const [loading, setLoading] = useState(false);
  const { mensaje, enviarForm } = useEnviarForm();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      domicilio: domicilio,
      localidad_id: localidad,
      cantidad_huespedes: huespedes,
      fecha_inicio_disponibilidad: inicioDisponibilidad,
      cantidad_dias: dias,
      disponible: disponible,
      valor_noche: valorNoche,
      tipo_propiedad_id: tipo,
      imagen: imagen
    };
    setLoading(true);
    await enviarForm(data, urlPropiedad);
    setLoading(false);
    setDomicilio("");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="App">
      <h1>Crear propiedad</h1>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          domicilio:
          <input
            type="text"
            value={domicilio}
            onChange={(e) => setDomicilio(e.target.value)}
            disabled={loading}
          />
        </label>
        <label>
          localidad:
          <input
            type="text"
            value={localidad}
            onChange={(e) => setLocalidad(e.target.value)}
            disabled={loading}
          />
        </label>
        <label>
          huespedes :
          <input
            type="text"
            value={huespedes}
            onChange={(e) => setHuespedes(e.target.value)}
            disabled={loading}
          />
        </label>
        <label>
          inicioDisponibilidad:
          <input
            type="text"
            value={inicioDisponibilidad}
            onChange={(e) => setInicioDisponibilidad(e.target.value)}
            disabled={loading}
          />
        </label>
        <label>
          dias:
          <input
            type="number"
            value={dias}
            onChange={(e) => setDias(e.target.value)}
            disabled={loading}
          />
        </label>
        <label>
          disponible:
          <input
            type="checkbox"
            checked={disponible}
            onChange={(e) => setDisp(e.target.checked)}
            disabled={loading}
          />
        </label>
        <label>
          valorNoche:
          <input
            type="text"
            value={valorNoche}
            onChange={(e) => setValor(e.target.value)}
            disabled={loading}
          />
        </label>
        <label>
          tipo:
          <input
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            disabled={loading}
          />
        </label>
        <label>
          imagen:
          <input
            type="text"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            disabled={loading}
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

export default NewPropiedadPage;
