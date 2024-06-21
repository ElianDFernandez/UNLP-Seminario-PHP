import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFindById, useForm } from "../../utils/function.js";
import { urlLocalidad } from "../../config/general-config.js";

const EditLocalidadPage = () => {
  const navigate = useNavigate();
  const id = window.location.pathname.split("/").pop();
  const { data, fetchData } = useFindById(`${urlLocalidad}/${id}`);
  
  const dataInicial = {
    nombre: data ? data.nombre : "",
  };

  const validacion = (form) => {
    const errores = {};
    if (!form.nombre) {
      errores.nombre = "El campo nombre es obligatorio";
    }
    return errores;
  };

  const { form, setForm, errores, loading, handleChange, handleSubmit, mensaje } = useForm(dataInicial, validacion, `${urlLocalidad}/${id}`, 'PUT');

  useEffect(() => {
    if (data) {
      setForm({ nombre: data.nombre });
    }
  }, [data, setForm]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='App'>
      <h1>Editar Localidad</h1>
      {mensaje && <p>{mensaje}</p>}
      {!data ? (<p>Cargando datos...</p>) : (
        <form onSubmit={handleSubmit}>
          <label>Nombre:<input type="text" name="nombre" value={form.nombre} onChange={handleChange} disabled={loading}/>
            {errores.nombre && <div className="alerta">{errores.nombre}</div>}
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


export default EditLocalidadPage;
