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
        let isError = false;
        if (!form.nombre.trim()) {
          errores['nombre'] = "El campo nombre es obligatorio";
          isError = true;
        }
        if (!form.apellido.trim()) {
          errores['apellido'] = "El campo apellido es obligatorio";
          isError = true;
        }
        if (!form.documento.trim()) {
          errores['documento'] = "El campo documento es obligatorio";
          isError = true;
        }
        if (!form.email.trim()) {
          errores['email'] = "El campo email es obligatorio";
          isError = true;
        }
        return isError ? errores : null;
      };

    const { form, errores, loading, handleChange, handleSubmit, mensaje } = useForm(dataInicial, validacion, urlInquilino, 'POST');

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='App'>
            <h1>Crear Inquilino</h1>
            {mensaje && <p>{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <label>Nombre:
                    <input type="text" className="form-control" name="nombre" value={form.nombre} onChange={handleChange} />
                    {errores.nombre && <div className="alerta"><p>{errores.nombre}</p></div>}
                </label>
                <label>Apellido:
                    <input type="text" className="form-control" name="apellido" value={form.apellido} onChange={handleChange} />
                    {errores.apellido && <div className="alerta"><p>{errores.apellido}</p></div>}
                </label>
                <label>Documento:
                    <input type="text" className="form-control" name="documento" value={form.documento} onChange={handleChange} />
                    {errores.documento && <div className="alerta"><p>{errores.documento}</p></div>}
                </label>
                <label>Email:
                    <input type="text" className="form-control" name="email" value={form.email} onChange={handleChange} />
                    {errores.email && <div className="alerta"><p>{errores.email}</p></div>}
                </label>
                <label>Activo:
                    <input type="checkbox" className="form-control" name="activo" checked={form.activo} onChange={handleChange} />
                    {errores.activo && <div className="alerta"><p>{errores.activo}</p></div>}
                </label>
                <button type="submit">Crear</button>
                <button type="button" onClick={handleGoBack}>Volver</button>
            </form>
        </div>
    );
};

export default NewInquilinoPage;