import React, { useEffect, useState } from "react";
import { useFetch, useForm } from "../../utils/function.js";
import { useNavigate } from "react-router-dom";
import { urlReserva, urlInquilino, urlPropiedad, urlLocalidad } from "../../config/general-config.js";

const NewReservaPage = () => {
  const navigate = useNavigate();

  const dataInicial = {
    inquilino_id: "",
    propiedad_id: "",
    fecha_desde: "",
    cantidad_noches: 0,
    valor_total: 0,
  };

  const [valor_total, setValorTotal] = useState(0);

  const validacion = (form) => {
    const errores = {};
    let isError = false;
    if (!form.inquilino_id) {
      errores['inquilino_id'] = "El campo inquilino es obligatorio";
      isError = true;
    }
    if (!form.propiedad_id) {
      errores['propiedad_id'] = "El campo propiedad es obligatorio";
      isError = true;
    }
    if (!form.fecha_desde) {
      errores['fecha_desde'] = "El campo fecha es obligatorio";
      isError = true;
    }
    if (!form.cantidad_noches) {
      errores['cantidad_noches'] = "El campo cantidad de noches es obligatorio";
      isError = true;
    }
    return isError ? errores : null;
  };

  const { form, errores, loading, handleChange, handleSubmit, mensaje } = useForm(dataInicial, validacion, urlReserva, 'POST');

  const { data: propiedades, fetchData: fetchPropiedades } = useFetch(`${urlPropiedad}/null/null/null/null`);
  const { data: inquilinos, fetchData: fetchInquilinos } = useFetch(urlInquilino);
  const { data: localidades, fetchData: fetchLocalidades } = useFetch(urlLocalidad);

  useEffect(() => {
    fetchPropiedades();
    fetchInquilinos();
    fetchLocalidades();
  }, []);

  useEffect(() => {
    const propiedadSeleccionada = propiedades?.find(prop => prop.id === parseInt(form.propiedad_id));
    const total = propiedadSeleccionada ? propiedadSeleccionada.valor_noche * form.cantidad_noches : 0;
    setValorTotal(total);
  }, [form.propiedad_id, form.cantidad_noches, propiedades]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const getLocalidadNombre = (id) => {
    const localidad = localidades?.find(localidad => localidad.id === id);
    return localidad ? localidad.nombre : "Desconocido";
  };

  return (
    <div className="App">
      <h1>Crear Reserva</h1>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <label>Inquilino:
          <select name="inquilino_id" value={form.inquilino_id} onChange={handleChange}>
            <option value="">-- Seleccione --</option>
            {inquilinos?.map(inquilino => (
              <option key={inquilino.id} value={inquilino.id}>{inquilino.apellido}, {inquilino.nombre}</option>
            ))}
          </select>
          {errores.inquilino_id && <p>{errores.inquilino_id}</p>}
        </label>
        <label>Propiedad:
          <select name="propiedad_id" value={form.propiedad_id} onChange={handleChange}>
            <option value="">-- Seleccione --</option>
            {propiedades?.map(propiedad => (
              <option key={propiedad.id} value={propiedad.id}>{getLocalidadNombre(propiedad.localidad_id)}-{propiedad.domicilio}</option>
            ))}
          </select>
          {errores.propiedad_id && <p>{errores.propiedad_id}</p>}
        </label>
        <label>Fecha:
          <input type="date" name="fecha_desde" value={form.fecha_desde} onChange={handleChange} />
          {errores.fecha_desde && <p>{errores.fecha_desde}</p>}
        </label>
        <label>Cantidad de noches:
        <input type="number" name="cantidad_noches" value={form.cantidad_noches} onChange={(event) => {const inputValue = event.target.value;if (parseInt(inputValue) > 0) {handleChange(event);}}}/>
          {errores.cantidad_noches && <p>{errores.cantidad_noches}</p>}
        </label>
        <label>Valor total:
          <input type="number" name="valor_total" value={valor_total} min="0" disabled />
        </label>
        <button type="submit">Crear</button>
        <button type="button" onClick={handleGoBack}>Cancelar</button>
      </form>
    </div>
  );
};

export default NewReservaPage;