import React from "react";
import { useFetch, useEnviarDelete } from "../../utils/function.js";
import { useNavigate } from "react-router-dom";
import { urlLocalidad } from "../../config/general-config.js";
import ItemComponent from "../../components/ItemComponent.jsx";

const LocalidadPage = () => {
  const { data, loading, error, fetchData } = useFetch(urlLocalidad);
  const navigate = useNavigate();
  const { mensaje, enviarDelete } = useEnviarDelete();

  const handleCreateClick = () => {
    navigate("/localidades/new");
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Desea eliminar esta localidad?")) {
      const deleteUrl = `${urlLocalidad}/${id}`;
      enviarDelete(deleteUrl, fetchData);
    }
  };

  const handleEdit = (id) => {
    navigate(`/localidades/edit/${id}`);
  };

  const fields = [{ label: "Nombre", field: "nombre" }];

  return (
    <div className="App">
      <h1>Localidades</h1>
      <button onClick={handleCreateClick}>Crear Localidad</button>
      <div className="Tabla">
        {loading && <p>Cargando...</p>}
        {error && <p>Error: {error}</p>}
        {mensaje && <p>{mensaje}</p>}
        <ul>
          {data ? (
            data.map((localidad) => (
              <ItemComponent
                key={localidad.id}
                item={localidad}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                fields={fields}
              />
            ))
          ) : (
            <li>No hay localidades registradas.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default LocalidadPage;
