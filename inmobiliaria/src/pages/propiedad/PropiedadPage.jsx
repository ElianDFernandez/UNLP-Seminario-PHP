import React, { useState, useEffect } from "react";
import { useFetch, useEnviarDelete } from "../../utils/function.js";
import { useNavigate } from "react-router-dom";
import { urlPropiedad, urlLocalidad, urlTipoPropiedad } from "../../config/general-config.js";
import ItemComponent from '../../components/ItemComponent.jsx';

const PropiedadPage = () => {
  const [filtroLocalidad, setFiltroLocalidad] = useState(null);
  const [filtroDisponible, setFiltroDisponible] = useState(null);
  const [filtroInicioDisponibilidad, setFiltroInicioDisponibilidad] = useState(null);
  const [filtroCantHuespedes, setFiltroCantHuespedes] = useState(null);

  const urlPropiedadIndex = `${urlPropiedad}/${filtroLocalidad}/${filtroDisponible}/${filtroInicioDisponibilidad}/${filtroCantHuespedes}`;
  
  const { data: propiedades, fetchData: fetchPropiedades } = useFetch(urlPropiedadIndex);
  const { data: localidades, fetchData: fetchLocalidades } = useFetch(urlLocalidad);
  const { data: tiposPropiedades, fetchData: fetchTiposPropiedades } = useFetch(urlTipoPropiedad);

  const navigate = useNavigate();
  const { mensaje, enviarDelete } = useEnviarDelete();

  useEffect(() => {
    fetchLocalidades();
    fetchTiposPropiedades();
    fetchPropiedades();
  }, []);

  const handleCreateClick = () => {
    navigate("/propiedades/new");
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Deseas eliminar esta propiedad?")) {
      const deleteUrl = `${urlPropiedad}/${id}`;
      enviarDelete(deleteUrl, fetchPropiedades);
    }
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

  const fields = [
    { label: 'Domicilio', field: 'domicilio' },
    { label: 'Localidad', field: 'localidad_id', formatter: (item) => getLocalidadNombre(item.localidad_id) },
    { label: 'Cantidad de huéspedes', field: 'cantidad_huespedes' },
    { label: 'Fecha de inicio de disponibilidad', field: 'fecha_inicio_disponibilidad' },
    { label: 'Cantidad de días', field: 'cantidad_dias' },
    { label: 'Disponible', field: 'disponible' },
    { label: 'Valor por noche', field: 'valor_noche' },
    { label: 'Tipo de propiedad', field: 'tipo_propiedad_id', formatter: (item) => getTipoPropiedadNombre(item.tipo_propiedad_id) },
    { label: 'Imagen', field: 'imagen' },
  ];

  return (
    <div className="App">
      <div className="filtros-container">
        <div className="filtro-container">
          <label>Localidad:</label>
          <select value={filtroLocalidad} onChange={(e) => setFiltroLocalidad(e.target.value)}>
            <option value="null">Todas</option>
            {localidades &&
              localidades.map(localidad => (
                <option key={localidad.id} value={localidad.id}>
                  {localidad.nombre}
                </option>
              ))}
          </select>
        </div>
        <div className="filtro-container">
          <label>Disponible:</label>
          <select value={filtroDisponible} onChange={(e) => setFiltroDisponible(e.target.value)}>
            <option value="null">Todos</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="filtro-container">
          <label>Fecha de inicio de disponibilidad:</label>
          <input 
            type="date" 
            value={filtroInicioDisponibilidad || ''}
            onChange={(e) => {
              const selectedDate = e.target.value;
              const formattedDate = selectedDate.replaceAll('-', '');
              setFiltroInicioDisponibilidad(formattedDate || null);
            }}
          />
        </div>
        <div className="filtro-container">
          <label>Cantidad de huéspedes:</label>
          <input 
            type="number" 
            value={filtroCantHuespedes || ''} 
            onChange={(e) => setFiltroCantHuespedes(e.target.value || null)}
          />
        </div>
      </div>
      <button onClick={handleCreateClick}>Crear Nueva Propiedad</button>
      <div className="Tabla">
        {mensaje && <p>{mensaje}</p>}
        <ul>
          {propiedades ? (
            propiedades.map((propiedad) => (
              <ItemComponent
                key={propiedad.id}
                item={propiedad}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                fields={fields}
              />
            ))
          ) : (
            <li>No se encontraron propiedades.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PropiedadPage;