import React, { useState } from "react";
import { useFindById, useEnviarForm } from "../../utils/function.js";
import { useNavigate } from "react-router-dom";
import { urlPropiedad } from "../../config/general-config.js";

const EditPropiedadPage = () => {
  const navigate = useNavigate();
  const id = window.location.pathname.split("/").pop();
  const [domicilio, setDomicilio] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [huespedes, setHuespedes] = useState("");
  const [inicioDisponibilidad, setInicioDisponibilidad] = useState("");
  const [dias, setDias] = useState("");
  const [disponible, setDisp] = useState(false);
  const [valorNoche, setValor] = useState("");
  const [tipo, setTipo] = useState("");
  const [imagen, setImagen] = useState("");
  const { data, fetchData } = useFindById(`${urlPropiedad}/${id}`);
  const { mensaje, enviarForm } = useEnviarForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = {
      domicilio: domicilio,
      localidad_id: localidad,
      cantidad_huespedes: huespedes,
      fecha_inicio_disponibilidad: inicioDisponibilidad,
      cantidad_dias: dias,
      disponible: disponible,
      valor_noche: valorNoche,
      tipo_propiedad_id: tipo,
      imagen: imagen,
    };
    const updateUrl = `${urlPropiedad}/${id}`;
    setLoading(true);
    await enviarForm(form, updateUrl, "PUT", fetchData);
    setLoading(false);
    setDomicilio("");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="App">
      <h1>Editar Propiedad</h1>
      {mensaje && <p>{mensaje}</p>}
      {!data ? (
        <p>Cargando datos...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            domicilio:
            <input
              type="text"
              placeholder={data.domicilio}
              value={domicilio}
              onChange={(event) => setDomicilio(event.target.value)}
              disabled={loading}
            />
          </label>
          <label>
            localidad:
            <input
              type="text"
              placeholder={data.localidad}
              value={localidad}
              onChange={(event) => setLocalidad(event.target.value)}
              disabled={loading}
            />
          </label>
          <label>
            huespedes:
            <input
              type="text"
              placeholder={data.huespedes}
              value={huespedes}
              onChange={(event) => setHuespedes(event.target.value)}
              disabled={loading}
            />
          </label>
          <label>
            inicioDisponibilidad:
            <input
              type="text"
              placeholder={data.inicioDisponibilidad}
              value={inicioDisponibilidad}
              onChange={(event) => setInicioDisponibilidad(event.target.value)}
              disabled={loading}
            />
          </label>
          <label>
            disponible:
            <input
              type="checkbox"
              checked={disponible}
              onChange={(event) => setDisp(event.target.checked)}
              disabled={loading}
            />
          </label>
          <label>
            valorNoche:
            <input
              type="text"
              placeholder={data.valorNoche}
              value={valorNoche}
              onChange={(event) => setValor(event.target.value)}
              disabled={loading}
            />
          </label>
          <label>
            tipo:
            <input
              type="text"
              placeholder={data.tipo}
              value={tipo}
              onChange={(event) => setTipo(event.target.value)}
              disabled={loading}
            />
          </label>
          <label>
            imagen:
            <input
              type="text"
              placeholder={data.imagen}
              value={imagen}
              onChange={(event) => setImagen(event.target.value)}
              disabled={loading}
            />
          </label>
          <label>
            dias:
            <input
              type="text"
              placeholder={data.dias}
              value={dias}
              onChange={(event) => setDias(event.target.value)}
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

export default EditPropiedadPage;
