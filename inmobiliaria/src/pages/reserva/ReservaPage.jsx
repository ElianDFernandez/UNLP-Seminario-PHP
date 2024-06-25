import React, { useEffect } from "react";
import { useFetch, useEnviarDelete } from "../../utils/function.js";
import { useNavigate } from "react-router-dom";
import { urlReserva, urlInquilino, urlPropiedad, urlLocalidad } from "../../config/general-config.js";
import ItemComponent from '../../components/ItemComponent.jsx';

const ReservaPage = () => {
  const { data: reservas, fetchData: fetchReservas } = useFetch(urlReserva);
  const { data: propiedades, fetchData: fetchPropiedades } = useFetch(`${urlPropiedad}/null/null/null/null`);
  const { data: inquilinos, fetchData: fetchInquilinos } = useFetch(urlInquilino);
  const { data: localidades, fetchData: fetchLocalidades } = useFetch(urlLocalidad);
  const navigate = useNavigate();
  const { mensaje, enviarDelete } = useEnviarDelete();

  useEffect(() => {
    fetchReservas();
    fetchPropiedades();
    fetchInquilinos();
    fetchLocalidades();
  }, []);

  const handleCreateClick = () => {
    navigate("/reservas/new");
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Desea eliminar esta reserva?")) {
      const deleteUrl = `${urlReserva}/${id}`;
      enviarDelete(deleteUrl, fetchReservas);
    }
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
    return propiedad ? `${getLocalidadNombre(propiedad.localidad_id)}, ${propiedad.domicilio}` : "Desconocido";
  };

  const getInquilinoNombre = (id) => {
    const inquilino = inquilinos?.find(inquilino => inquilino.id === id);
    return inquilino ? inquilino.nombre : "Desconocido";
  };

  const getValorTotal = (propiedad_id, cantidad_noches) => {
    const propiedad = propiedades?.find(propiedad => propiedad.id === propiedad_id);
    return propiedad ? propiedad.valor_noche * cantidad_noches : 0;
  };

  const fields = [
    { label: 'Inquilino', field: 'inquilino_id', formatter: (item) => getInquilinoNombre(item.inquilino_id) },
    { label: 'Propiedad', field: 'propiedad_id', formatter: (item) => getPropiedadDomicilio(item.propiedad_id) },
    { label: 'Fecha desde', field: 'fecha_desde' },
    { label: 'Cantidad de noches', field: 'cantidad_noches' },
    { label: 'Valor total', field: 'valor_total', formatter: (item) => `$${getValorTotal(item.propiedad_id, item.cantidad_noches)}` }
  ];

  return (
    <div className="App">
      <h1>Reservas</h1>
      <button onClick={handleCreateClick}>Crear nueva reserva</button>
      <div className="Tabla">
        <ul>
          {mensaje && <p>{mensaje}</p>}
          {reservas ? (
            reservas.map((reserva) => (
              <ItemComponent
                key={reserva.id}
                item={reserva}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                fields={fields}
              />
            ))
          ) : (
            <li>No hay reservas registradas.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ReservaPage;
