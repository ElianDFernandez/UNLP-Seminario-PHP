import React from "react";
import { useFetch, useEnviarDelete } from "../../utils/function.js";
import { useNavigate } from "react-router-dom";
import { urlReserva } from "../../config/general-config.js";

const ReservaPage = () => {
  const { data, fetchData } = useFetch(urlReserva);
  const navigate = useNavigate();
  const { mensaje, enviarDelete } = useEnviarDelete();

  const handleCreateClick = () => {
    navigate("/reservas/new");
  };

  const handleDelete = (id) => {
    const deleteUrl = `${urlReserva}/${id}`;
    enviarDelete(deleteUrl, fetchData);
  };

  const handleEdit = (id) => {
    navigate(`/reservas/edit/${id}`);
  };

  return (
    <div className="App">
      <h1>Reservas</h1>
      <button onClick={handleCreateClick}>Crear nueva reserva</button>
      <div className="Tabla">
        <ul>
          {mensaje && <p>{mensaje}</p>}
          {data ? (
            data.map((reserva) => (
              <li key={reserva.id}>
                {reserva.inquilino_id}
                {reserva.localidad_id}
                {reserva.fecha_desde}
                {reserva.cantidad_noches}
                {reserva.valor_total}
                <button onClick={() => handleEdit(reserva.id)}>Editar</button>
                <button onClick={() => handleDelete(reserva.id)}>
                  Eliminar
                </button>
              </li>
            ))
          ) : (
            <li>Cargando...</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ReservaPage;
