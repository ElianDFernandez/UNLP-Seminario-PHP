import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../utils/function";
import { urlInquilino } from '../../config/general-config.js';

const NewInquilinoPage = () => {
    const dataInicial = {
        nombre: '',
        apellido: '',
        documento: '',
        email: '',
        activo: false
    };

    const validacion = (form) => {
        const errores = {};
        if (!form.nombre) {
            errores['nombre'] = "El campo nombre es obligatorio";
        } else if (form.nombre.length > 25) {
        errores['nombre'] = "El nombre no puede tener más de 25 caracteres";
        }
        if (!form.apellido) {
        errores['apellido'] = "El campo apellido es obligatorio";
        } else if (form.apellido.length > 15) {
        errores['apellido'] = "El apellido no puede tener más de 15 caracteres";
        }
        if (!form.documento) {
        errores['documento'] = "El campo documento es obligatorio";
        } else if (form.documento.length > 25) {
        errores['documento'] = "El documento no puede tener más de 25 caracteres";
        }
        if (!form.email) {
            errores['email'] = "El campo email es obligatorio";
          } else if (form.email.length > 20) {
            errores['email'] = "El email no puede tener más de 20 caracteres";
          }
        return errores;
      };

    const { form, setForm, errores, loading, handleChange, handleSubmit, mensaje } = useForm(dataInicial, validacion, urlInquilino, 'POST');

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="App">
          <div className="form-container">
            <h1>Crear Inquilino</h1>
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
                <label>Apellido:</label>
                <input
                  type="text"
                  className="form-control"
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                />
                {errores.apellido && (
                  <div className="alerta">
                    <p>{errores.apellido}</p>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Documento:</label>
                <input
                  type="text"
                  className="form-control"
                  name="documento"
                  value={form.documento}
                  onChange={handleChange}
                />
                {errores.documento && (
                  <div className="alerta">
                    <p>{errores.documento}</p>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
                {errores.email && (
                  <div className="alerta">
                    <p>{errores.email}</p>
                  </div>
                )}
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Crear
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleGoBack}>
                  Volver
                </button>
                {mensaje && <p>{mensaje}</p>}
              </div>
            </form>
          </div>
        </div>
      );
};

export default NewInquilinoPage;