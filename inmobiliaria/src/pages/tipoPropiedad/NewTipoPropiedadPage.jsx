import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../utils/function";
import { urlTipoPropiedad } from "../../config/general-config";

const NewTipoPropiedadPage = () => {
  const dataInicial = {
    nombre: '',
  };

  const validacion = (form) => {
    const errores = {};
    if (!form.nombre.trim()) {
      errores['nombre'] = "El campo nombre es obligatorio";
    }
    return errores;
  };

  const { form, setForm, errores, loading, handleChange, handleSubmit, mensaje } = useForm(dataInicial, validacion, urlTipoPropiedad, 'POST');

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1>Crear Tipo de Propiedad</h1>
        {mensaje && (
          <div className="mensaje">
            <p>{mensaje}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
            />
            {errores.nombre && (
              <div className="alerta">
                <p>{errores.nombre}</p>
              </div>
            )}
          </div>
          <div className="form-group">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Cargando...' : 'Crear'}
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
      </div>
    </div>
  );  
};

export default NewTipoPropiedadPage;