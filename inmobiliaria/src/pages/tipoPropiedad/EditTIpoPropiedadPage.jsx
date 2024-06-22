import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../utils/function";
import { useFindById } from "../../utils/function"; // Asegúrate de importar useFindById si es necesario
import { urlTipoPropiedad } from "../../config/general-config";

const EditTipoPropiedadPage = () => {
  const navigate = useNavigate();
  const id = window.location.pathname.split("/").pop();
  const { data, fetchData } = useFindById(`${urlTipoPropiedad}/${id}`);

  const dataInicial = {
    nombre: data ? data.nombre : ''
  };

  const validacion = (form) => {
    const errores = {};
    if (!form.nombre) {
      errores.nombre = "El campo nombre es obligatorio";
    }
    return errores;
  };

  const { form, setForm, errores, loading, handleChange, handleSubmit, mensaje } = useForm(dataInicial, validacion, `${urlTipoPropiedad}/${id}`, 'PUT');

  useEffect(() => {
    if (data) {
      setForm({ nombre: data.nombre });
    }
  }, [data, setForm]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1>Editar Tipo de Propiedad</h1>
        {mensaje && <p>{mensaje}</p>}
        {!data ? (
          <p>Cargando datos...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                disabled={loading}
                className="form-control"
              />
              {errores.nombre && (
                <div className="alerta">{errores.nombre}</div>
              )}
            </div>
            <div className="form-group">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? 'Cargando...' : 'Guardar'}
              </button>
              <button
                type="button"
                onClick={handleGoBack}
                disabled={loading}
                className="btn btn-secondary"
              >
                Volver
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditTipoPropiedadPage;