import React from "react";
import { useFetch, useEnviarDelete } from "../../utils/function.js";
import { useNavigate } from "react-router-dom";
import { urlLocalidad } from "../../config/general-config.js";

const LocalidadPage = () => {
  const { data, fetchData } = useFetch(urlLocalidad);
  const navigate = useNavigate();
  const { mensaje, enviarDelete } = useEnviarDelete();

  const handleCreateClick = () => {
    navigate("/localidades/new");
  };

  const handleDelete = (id) => {
    const deleteUrl = `${urlLocalidad}/${id}`;
    enviarDelete(deleteUrl, fetchData);
  };

  const handleEdit = (id) => {
    navigate(`/localidades/edit/${id}`);
  };

  return (
    <div className="App">
      <h1>Localidades</h1>
      <button onClick={handleCreateClick}>Crear Localidad</button>
      <div className="Tabla">
        <ul>
          {mensaje && <p>{mensaje}</p>}
          {data ? (
            data.map((Localidad) => (
              <li key={Localidad.id}>
                {Localidad.nombre}
                <button onClick={() => handleEdit(Localidad.id)}>Editar</button>
                <button onClick={() => handleDelete(Localidad.id)}>
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

export default LocalidadPage;
