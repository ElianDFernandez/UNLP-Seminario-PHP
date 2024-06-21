import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch, useForm } from "../../utils/function.js";
import { urlReserva, urlInquilino, urlPropiedadAll, urlLocalidad } from "../../config/general-config.js";

const NewReservaPage = () => {
  const dataInicial  = {
    inquilino_id: "",
    propiedad_id: "",
    fecha_desde: "",
    cantidad_noches: "",
  }

  const { data: propiedades, fetchData: fetchPropiedades } = useFetch(urlPropiedadAll);
  const { data: inquilinos, fetchData: fetchInquilinos } = useFetch(urlInquilino);
  const { data: localidades, fetchData: fetchLocalidades } = useFetch(urlLocalidad);

  const [valor_total, setValor] = useState(0);
  const navigate = useNavigate();

  const validacion = (form) => {
    const errores = {};
    if (!form.inquilino_id) {
      errores["inquilino_id"] = "El campo inquilino es obligatorio";
    }
    if (!form.propiedad_id) {
      errores["propiedad_id"] = "El campo propiedad es obligatorio";
    }
    if (!form.cantidad_noches) {
      errores["cantidad_noches"] = "El campo cantidad de noches es obligatorio";
    }
    if (!form.fecha_desde) {
      errores["fecha_desde"] = "El campo fecha de inicio es obligatorio";
    }
    return errores;
  };

  const { form, setForm, errores, loading, handleChange, handleSubmit, mensaje } = useForm(dataInicial, validacion, urlReserva, 'POST');

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchPropiedades();
    fetchInquilinos();
    fetchLocalidades();
  }, []);

  const getLocalidadNombre = (id) => {
    const localidad = localidades?.find(localidad => localidad.id === id);
    return localidad ? localidad.nombre : "Desconocido";
  };
  
  useEffect(() => {
    if (form.cantidad_noches && form.propiedad_id) {
      const cantidadNoches = parseInt(form.cantidad_noches, 10);
      const propiedad = propiedades?.find(propiedad => propiedad.id == form.propiedad_id);
      const total = cantidadNoches * propiedad.valor_noche;
      setValor(total);
    }
  }, [form.cantidad_noches, form.propiedad_id]);

  return (
    <div>
      <h1>Nueva Reserva</h1>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
          <label htmlFor="inquilino_id">Inquilino:</label>
          <select id="inquilino_id" name="inquilino_id" className="form-control" value={form.inquilino_id} onChange={handleChange}>
          <option value="">Seleccione un inquilino</option>
          {inquilinos?.filter(inquilino => inquilino.activo).map((inquilino) => (
            <option key={inquilino.id} value={inquilino.id}>
              {inquilino.nombre}
            </option>
          ))}
        </select>
          {errores.inquilino_id && <div className="alert alert-danger">{errores.inquilino_id}</div>}
          <label htmlFor="propiedad_id">Propiedad:</label>
          <select id="propiedad_id" name="propiedad_id" className="form-control" value={form.propiedad_id} onChange={handleChange}>
            <option value="">Seleccione una propiedad</option>
            {propiedades?.map((propiedad) => (
              <option key={propiedad.id} value={propiedad.id}>
                {getLocalidadNombre(propiedad.localidad_id)} - {propiedad.domicilio}
              </option>
            ))}
          </select>
          {errores.propiedad_id && <div className="alert alert-danger">{errores.propiedad_id}</div>}
        <label htmlFor="fecha_desde">Fecha de Inicio:</label>
          <input type="date" id="fecha_desde" name="fecha_desde" className="form-control" value={form.fecha_desde} onChange={handleChange} />
          {errores.fecha_desde && <div className="alert alert-danger">{errores.fecha_desde}</div>}
        <label htmlFor="cantidad_noches">Cantidad de Noches:</label>
          <input type="number" id="cantidad_noches" name="cantidad_noches" className="form-control" value={form.cantidad_noches} onChange={handleChange} />
          {errores.cantidad_noches && <div className="alert alert-danger">{errores.cantidad_noches}</div>}
  
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Cargando...' : 'Guardar'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleGoBack} disabled={loading}>
          Volver
        </button>
        <p>Valor Total: {valor_total}</p>
      </form>
    </div>
  );
};

export default NewReservaPage;