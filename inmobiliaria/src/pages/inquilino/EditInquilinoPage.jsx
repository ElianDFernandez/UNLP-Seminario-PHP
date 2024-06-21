import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFindById, useForm } from "../../utils/function.js";
import { urlInquilino } from "../../config/general-config.js";

const EditInquilinoPage = () => {
    const navigate = useNavigate();
    const id = window.location.pathname.split('/').pop();
    const { data, fetchData } = useFindById(`${urlInquilino}/${id}`);

    const dataInicial = {
        nombre: data ? data.nombre : "",
        apellido: data ? data.apellido : "",
        documento: data ? data.documento : "",
        email: data ? data.email : "",
        activo: !!data && data.activo,
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
        if (!form.activo) {
            form.activo = 0
        }
        return errores;
      };

    const { form, setForm, errores, loading, handleChange, handleSubmit, mensaje } = useForm(dataInicial, validacion,  `${urlInquilino}/${id}`, 'PUT');

    useEffect(() => {
        if (data) {
          setForm({ nombre: data.nombre,
                    apellido: data.apellido,
                    documento: data.documento,
                    email: data.email,
                    activo: !!data && data.activo
                });
        }
      }, [data, setForm]);

    const handleGoBack = () => {
        navigate(-1);
    };
    
    return (
        <div className='App'>
            <h1>Editar Inquilino</h1>
            {mensaje && <p>{mensaje}</p>}
            {!data ? (<p>Cargando datos...</p>) : (
            <form onSubmit={handleSubmit}>
                <label>Nombre:<input type="text" className="form-control" name="nombre" placeholder = {data.nombre} value={form.nombre} onChange={handleChange} />
                    {errores && <p>{errores['nombre']}</p>}
                </label>
                <label>Apellido:<input type="text" className="form-control" name="apellido" placeholder = {data.apellido} value={form.apellido} onChange={handleChange} />
                    {errores && <p>{errores['apellido']}</p>}
                </label>
                <label>Documento:<input type="text" className="form-control" name="documento" placeholder = {data.documento} value={form.documento} onChange={handleChange} />
                    {errores && <p>{errores['documento']}</p>}
                </label>
                <label>Email:<input type="text" className="form-control" name="email" placeholder = {data.email} value={form.email} onChange={handleChange} />
                    {errores && <p>{errores['email']}</p>}
                </label>
                <label>Activo:<input type="checkbox" name="activo"  checked={form.activo} onChange={handleChange} />
                    {errores && <p>{errores['activo']}</p>}
                </label>
                <button type="submit">Guardar</button>
                <button type="button" onClick={handleGoBack}>Volver</button>
            </form>
            )}
        </div>
    );
};


export default EditInquilinoPage