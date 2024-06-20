import React, { useEffect } from "react";
import { useFetch, useEnviarDelete } from "../../utils/function.js";
import { useNavigate } from "react-router-dom";
import { urlReserva, urlInquilino, urlPropiedad, urlLocalidad } from "../../config/general-config.js";

const ReservaPage = () => {
  const { data: reservas, fetchData: fetchReservas } = useFetch(urlReserva);
  const { data: propiedades, fetchData: fetchPropiedades } = useFetch(`${urlPropiedad}/null/null/null/null`);
  const { data: inquilinos, fetchData: fetchInquilinos } = useFetch(urlInquilino);
  const { data: localidades, fetchData: fetchLocalidades } = useFetch(urlLocalidad);
  const navigate = useNavigate();
  const { mensaje, enviarDelete } = useEnviarDelete();

  useEffect(() => {
    fetchPropiedades();
    fetchInquilinos();
    fetchLocalidades();
  }, []);

  const handleCreateClick = () => {
    navigate("/reservas/new");
  };

  const handleDelete = (id) => {
    const deleteUrl = `${urlReserva}/${id}`;
    enviarDelete(deleteUrl, fetchReservas);
  };

  const handleEdit = (id) => {
    navigate(`/reservas/edit/${id}`);
  };

  const getLocalidadNombre = (id) => {
    const localidad = localidades?.find(localidad => localidad.id === id);
    return localidad ? localidad.nombre : "Desconocido";
  };

  const getPropiedadDomicilio = (id) => {
    const propiedad = propiedades?.find(propiedad => propiedad.id === id);
    const domicilioLocalidad = propiedad ? `${propiedad.domicilio}, ${getLocalidadNombre(propiedad.localidad_id)}` : "Desconocido";
    return domicilioLocalidad;
    };

  const getInquilinoNombre = (id) => {
    const inquilino = inquilinos?.find(inquilino => inquilino.id === id);
    return inquilino ? inquilino.nombre : "Desconocido";
  };

  const getValorTotal = (propiedad_id, cantidad_noches) => {
    const propiedad = propiedades?.find(propiedad => propiedad.id === propiedad_id);
    return propiedad ? propiedad.valor_noche * cantidad_noches : 0;
  }

  return (
    <div className="App">
      <h1>Reservas</h1>
      <button onClick={handleCreateClick}>Crear nueva reserva</button>
      <div className="Tabla">
        <ul>
          {mensaje && <p>{mensaje}</p>}
          {reservas ? (
            reservas.map((reserva) => (
              <li key={reserva.id}>
                {getInquilinoNombre(reserva.inquilino_id)}
                {getPropiedadDomicilio(reserva.propiedad_id)}
                {reserva.fecha_desde}
                {reserva.cantidad_noches}
                <span>$</span>{getValorTotal(reserva.propiedad_id, reserva.cantidad_noches)}
                <button onClick={() => handleEdit(reserva.id)}>Editar</button>
                <button onClick={() => handleDelete(reserva.id)}>Eliminar</button>
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