import React, { useState } from "react";
import { useFindById, useEnviarForm } from "../../utils/function.js";
import { useNavigate } from "react-router-dom";
import { urlTipoPropiedad } from "../../config/general-config.js";

const EditTipoPropiedadPage = () => {
  const navigate = useNavigate();
  const id = window.location.pathname.split("/").pop();
  const { data, fetchData } = useFindById(`${urlTipoPropiedad}/${id}`);
  const [nombre, setNombre] = useState(data && data.nombre);
  const { mensaje, enviarForm } = useEnviarForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = {
      nombre: nombre,
    };
    const updateUrl = `${urlTipoPropiedad}/${id}`;
    setLoading(true);
    await enviarForm(form, updateUrl, "PUT", fetchData);
    setLoading(false);
    setNombre("");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

    return (
        <div className='App'>
            <h1>Editar Tipo de Propiedad</h1>
            {mensaje && <p>{mensaje}</p>}
            {!data ? (
                <p>Cargando datos...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        Nombre:
                        <input type="text" defaultValue={data.nombre} value={nombre} placeholder={data.nombre} onChange={(event) => setNombre(event.target.value)} disabled={loading} required/>
                    </label>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Cargando...' : 'Guardar'}
                    </button>
                    <button type="button" onClick={handleGoBack} disabled={loading}>
                        Volver
                    </button>
                </form>
            )}
        </div>
    );
};

export default EditTipoPropiedadPage;
