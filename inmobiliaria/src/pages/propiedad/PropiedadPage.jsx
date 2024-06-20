import React, { useState, useEffect } from "react";
import { useFetch, useEnviarDelete } from "../../utils/function.js";
import { useNavigate } from "react-router-dom";
import { urlPropiedad, urlLocalidad, urlTipoPropiedad } from "../../config/general-config.js";

const PropiedadPage = () => {
  const [filtroLocalidad, setFiltroLocalidad] = useState(null);
  const [filtroDisponible, setFiltroDisponible] = useState(null);
  const [filtroInicioDisponibilidad, setFiltroInicioDisponibilidad] = useState(null);
  const [filtroCantHuespedes, setFiltroCantHuespedes] = useState(null);

  const urlPropiedadIndex = `${urlPropiedad}/${filtroLocalidad}/${filtroDisponible}/${filtroCantHuespedes}/${filtroInicioDisponibilidad}`;
  
  const { data: propiedades, fetchData: fetchPropiedades } = useFetch(urlPropiedadIndex);
  const { data: localidades, fetchData: fetchLocalidades } = useFetch(urlLocalidad);
  const { data: tiposPropiedades, fetchData: fetchTiposPropiedades } = useFetch(urlTipoPropiedad);

  const navigate = useNavigate();
  const { mensaje, enviarDelete } = useEnviarDelete();

  useEffect(() => {
    fetchLocalidades();
    fetchTiposPropiedades();
  }, []);

  const handleCreateClick = () => {
    navigate("/propiedades/new");
  };

  const handleDelete = (id) => {
    const deleteUrl = `${urlPropiedad}/${id}`;
    enviarDelete(deleteUrl, fetchPropiedades);
  };

  const handleEdit = (id) => {
    navigate(`/propiedades/edit/${id}`);
  };

  const getLocalidadNombre = (id) => {
    const localidad = localidades?.find(localidad => localidad.id === id);
    return localidad ? localidad.nombre : "Desconocido";
  };

  const getTipoPropiedadNombre = (id) => {
    const tipoPropiedad = tiposPropiedades?.find(tipo => tipo.id === id);
    return tipoPropiedad ? tipoPropiedad.nombre : "Desconocido";
  };

  return (
    <div className="App">
      <h1>Propiedades</h1>
      <button onClick={handleCreateClick}>Crear Nueva Propiedad</button>
      <div className="Tabla">
        <ul>
          {mensaje && <p>{mensaje}</p>}
          {propiedades ? (
            propiedades.map((propiedad) => (
              <li key={propiedad.id}>
                {propiedad.domicilio}
                {getLocalidadNombre(propiedad.localidad_id)}
                {propiedad.cantidad_huespedes}
                {propiedad.fecha_inicio_disponibilidad}
                {propiedad.cantidad_dias}
                {propiedad.disponible}
                {propiedad.valor_noche}
                {getTipoPropiedadNombre(propiedad.tipo_propiedad_id)}
                {propiedad.imagen}
                {propiedad.cantidad_habitaciones}
                {propiedad.cantidad_banios}
                {propiedad.cochera}
                <button onClick={() => handleEdit(propiedad.id)}>Editar</button>
                <button onClick={() => handleDelete(propiedad.id)}>Eliminar</button>
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

export default PropiedadPage;