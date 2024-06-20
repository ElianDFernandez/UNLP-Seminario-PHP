import React, { useState, useEffect } from "react";
import { useFindById, useEnviarForm, useFetch } from "../../utils/function.js";
import { useNavigate } from "react-router-dom";
import { urlReserva, urlPropiedad, urlInquilino, urlLocalidad } from "../../config/general-config.js";

const EditReservaPage = () => {
  const navigate = useNavigate();
  const id = window.location.pathname.split("/").pop();
  const { data: reserva, fetchData: fetchReserva } = useFindById(`${urlReserva}/${id}`);
  const { data: propiedades, fetchData: fetchPropiedades } = useFetch(`${urlPropiedad}/null/null/null/null`);
  const { data: inquilinos, fetchData: fetchInquilinos } = useFetch(urlInquilino);
  const { data: localidades, fetchData: fetchLocalidades } = useFetch(urlLocalidad);

  const [inquilino, setInquilino] = useState("");
  const [propiedad, setPropiedad] = useState("");
  const [fecha_desde, setFecha] = useState("");
  const [cant_noches, setNoches] = useState("");
  const [valor_total, setValor] = useState(true);
  const { mensaje, enviarForm } = useEnviarForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (reserva) {
      setInquilino(reserva.inquilino_id);
      setPropiedad(reserva.propiedad_id);
      setFecha(reserva.fecha_desde);
      setNoches(reserva.cantidad_noches);
    }
  }, [reserva]);

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
    await enviarForm(form, updateUrl, "PUT", fetchReserva);
    setLoading(false);
    setInquilino("");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="App">
      <h1>Editar Reserva</h1>
      {mensaje && <p>{mensaje}</p>}
      {!reserva ? (
        <p>Cargando datos...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Inquilino:
            <select
              value={inquilino}
              onChange={(event) => setInquilino(event.target.value)}
              disabled={loading}
            >
              <option value="">Seleccionar Inquilino</option>
              {inquilinos && inquilinos.map((inquilino) => (
                <option key={inquilino.id} value={inquilino.id}>
                  {inquilino.nombre}
                </option>
              ))}
            </select>
          </label>
          <label>
            Propiedad:
            <select
              value={propiedad}
              onChange={(event) => setPropiedad(event.target.value)}
              disabled={loading}
            >
              <option value="">Seleccionar Propiedad</option>
              {propiedades && propiedades.map((propiedad) => (
                <option key={propiedad.id} value={propiedad.id}>
                  {propiedad.domicilio} - {propiedad.localidad_id} {/* Asegúrate de mostrar el valor correcto aquí */}
                </option>
              ))}
            </select>
          </label>
          <label>
            Fecha Desde
            <input
              type="date"
              value={fecha_desde}
              onChange={(event) => setFecha(event.target.value)}
              disabled={loading}
            />
          </label>
          <label>
            Cantidad de Noches:
            <input
              type="number"
              value={cant_noches}
              onChange={(event) => {
                const inputValue = event.target.value;
                if (parseInt(inputValue) > 0) {
                  setNoches(inputValue);
                }
              }}
              disabled={loading}
            />
          </label>
          {/* Aquí podrías mostrar el valor total si es necesario */}
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