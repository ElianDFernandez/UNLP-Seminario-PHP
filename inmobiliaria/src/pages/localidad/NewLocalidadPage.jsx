import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../utils/function";
import { urlLocalidad } from "../../config/general-config";

const NewLocalidadPage = () => {
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

  const { form, setForm, errores, loading, handleChange, handleSubmit, mensaje } = useForm(dataInicial, validacion, urlLocalidad, 'POST');

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1>Crear Localidad</h1>
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
              <div className="alerta">{errores.nombre}</div>
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
            {mensaje && <p>{mensaje}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewLocalidadPage;
