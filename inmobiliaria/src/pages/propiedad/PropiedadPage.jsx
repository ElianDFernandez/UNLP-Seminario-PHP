import React from "react";
import { useFetch, useEnviarDelete } from "../../utils/function.js";
import { useNavigate } from "react-router-dom";
import { urlPropiedad } from "../../config/general-config.js";

const PropiedadPage = () => {
  const { data, fetchData } = useFetch(urlPropiedad);
  const navigate = useNavigate();
  const { mensaje, enviarDelete } = useEnviarDelete();

  const handleCreateClick = () => {
    navigate("/propiedades/new");
  };

  const handleDelete = (id) => {
    const deleteUrl = `${urlPropiedad}/${id}`;
    enviarDelete(deleteUrl, fetchData);
  };

  const handleEdit = (id) => {
    navigate(`/propiedades/edit/${id}`);
  };

  return (
    <div className="App">
      <h1>propiedades</h1>
      <button onClick={handleCreateClick}>Crear Nueva Propiedad</button>
      <div className="Tabla">
        <ul>
          {mensaje && <p>{mensaje}</p>}
          {data ? (
            data.map((propiedad) => (
              <li key={propiedad.id}>
                {propiedad.domicilio}
                {propiedad.localidad_id} {/* deberia ser inner join*/}
                {propiedad.cantidad_huespedes}
                {propiedad.fecha_inicio_disponibilidad}
                {propiedad.cantidad_dias}
                {propiedad.disponible}
                {propiedad.valor_noche}
                {propiedad.tipo_propiedad_id} {/* deberia ser inner join*/}
                {propiedad.imagen}
                {propiedad.cantidad_habitaciones}
                {propiedad.cantidad_banios}
                {propiedad.cochera}
                <button onClick={() => handleEdit(propiedad.id)}>Editar</button>
                <button onClick={() => handleDelete(propiedad.id)}>
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

export default PropiedadPage;
