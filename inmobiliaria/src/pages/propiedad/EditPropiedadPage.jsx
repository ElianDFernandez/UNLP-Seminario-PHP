import React, { useEffect } from "react";
import { useFindById, useForm, useFetch } from "../../utils/function.js";
import { useNavigate } from "react-router-dom";
import { urlPropiedad, urlLocalidad, urlTipoPropiedad } from "../../config/general-config.js";

const EditPropiedadPage = () => {
  const navigate = useNavigate();
  const id = window.location.pathname.split("/").pop();
  const { data: propiedad, fetchData: fetchPropiedad } = useFindById(`${urlPropiedad}/${id}`);

  const dataInicial = {
    domicilio: "",
    localidad_id: "",
    fecha_inicio_disponibilidad: "",
    cantidad_dias: 0,
    disponible: true,
    valor_noche: 0,
    tipo_propiedad_id: "",
    imagen: "",
    tipo_imagen: "",
  }

  const validacion = (form) => {
    const errores = {};
    if (!form.domicilio) {
      errores.domicilio = "El campo 'domicilio' es obligatorio";
    }
    if (!form.localidad_id) {
      errores.localidad = "El campo 'localidad' es obligatorio";
    }
    if (!form.cantidad_habitaciones) {
      errores.cantidad_habitaciones = "El campo 'cantidad de habitaciones' es obligatorio";
    } 
    if (!form.cantidad_huespedes) {
      errores.cantidad_huespedes = "El campo 'cantidad de huespedes' es obligatorio";
    } else if (form.cantidad_huespedes < 1) {
      errores.cantidad_huespedes = "El campo 'cantidad de huespedes' debe ser mayor o igual a 1";
    }
    if (!form.fecha_inicio_disponibilidad) {
      errores.fecha_inicio_disponibilidad = "El campo 'fecha de inicio de disponibilidad' es obligatorio";
    }
    if (!form.cantidad_dias) {
      errores.cantidad_dias = "El campo 'cantidad de dias' es obligatorio";
    } else if (form.cantidad_dias < 1) {
      errores.cantidad_dias = "El campo 'cantidad de dias' debe ser mayor o igual a 1";
    }
    if (!form.valor_noche) {
      errores.valor_noche = "El campo 'valor de la noche' es obligatorio";
    } else if (form.valor_noche < 1) {
      errores.valor_noche = "El campo 'valor de la noche' debe ser mayor o igual a 1";
    }
    if (!form.tipo_propiedad_id) {
      errores.tipo_propiedad_id = "El campo 'tipo de propiedad' es obligatorio";
    }
    return errores;
  };

  const { form, setForm, errores, loading, handleChange, handleSubmit, mensaje } = useForm(dataInicial, validacion, `${urlPropiedad}/${id}`, 'PUT');

  const handleGoBack = () => {
    navigate(-1);
  };

  const { data: localidades, fetchData: fetchLocalidades } = useFetch(urlLocalidad);
  const { data: tiposPropiedades, fetchData: fetchTiposPropiedades } = useFetch(urlTipoPropiedad);

  useEffect(() => {
    fetchLocalidades();
    fetchTiposPropiedades();
  }, []);

  useEffect(() => {
    if (propiedad) {
      setForm({
        domicilio: propiedad.domicilio,
        localidad_id: propiedad.localidad_id,
        fecha_inicio_disponibilidad: propiedad.fecha_inicio_disponibilidad,
        cantidad_dias: propiedad.cantidad_dias,
        cantidad_habitaciones: propiedad.cantidad_habitaciones,
        cantidad_huespedes: propiedad.cantidad_huespedes,
        disponible: propiedad.disponible,
        valor_noche: propiedad.valor_noche,
        tipo_propiedad_id: propiedad.tipo_propiedad_id,
        imagen: propiedad.imagen,
        tipo_imagen: propiedad.tipo_imagen
      });
    }
  }, [propiedad, setForm]);

  return (
    <div className="App">
      <h1>Editar propiedad</h1>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <label>Domicilio:<input type="text" className="form-control" name="domicilio" value={form.domicilio} onChange={handleChange} /></label>
          {errores.domicilio && <p className="text-danger">{errores.domicilio}</p>}
        <label>Localidad:<select className="form-control" name="localidad_id" value={form.localidad_id} onChange={handleChange}>
          <option value="">-- Seleccione --</option>
          {localidades && localidades.map(localidad => (
            <option key={localidad.id} value={localidad.id}>{localidad.nombre}</option>
          ))}
        </select></label>
          {errores.localidad && <p className="text-danger">{errores.localidad}</p>}
        <label>Cant. habitaciones:<input type="number" className="form-control" name="cantidad_habitaciones" value={form.cantidad_habitaciones} onChange={handleChange} /></label>
          {errores.cantidad_habitaciones && <p className="text-danger">{errores.cantidad_habitaciones}</p>}
        <label>Cantidad de huespedes:<input type="number" className="form-control" name="cantidad_huespedes" value={form.cantidad_huespedes} onChange={handleChange} /></label>
          {errores.cantidad_huespedes && <p className="text-danger">{errores.cantidad_huespedes}</p>}
        <label>Fecha inicio de disponibilidad:<input type="date" className="form-control" name="fecha_inicio_disponibilidad" value={form.fecha_inicio_disponibilidad} onChange={handleChange} /></label>
          {errores.fecha_inicio_disponibilidad && <p className="text-danger">{errores.fecha_inicio_disponibilidad}</p>}
        <label>Cantidad de dias:<input type="number" className="form-control" name="cantidad_dias" value={form.cantidad_dias} onChange={handleChange} /></label>
          {errores.cantidad_dias && <p className="text-danger">{errores.cantidad_dias}</p>}
        <label>Valor de la noche:<input type="number" className="form-control" name="valor_noche" value={form.valor_noche} onChange={handleChange} /></label>
          {errores.valor_noche && <p className="text-danger">{errores.valor_noche}</p>}
        <label>Tipo de propiedad:<select className="form-control" name="tipo_propiedad_id" value={form.tipo_propiedad_id} onChange={handleChange}>
          <option value="">-- Seleccione --</option>
          {tiposPropiedades && tiposPropiedades.map(tipoPropiedad => (
            <option key={tipoPropiedad.id} value={tipoPropiedad.id}>{tipoPropiedad.nombre}</option>
          ))} 
        </select></label> 
          {errores.tipo_propiedad_id && <p className="text-danger">{errores.tipo_propiedad_id}</p>}
        <label>Imagen:<input type="text" className="form-control" name="imagen" value={form.imagen} onChange={handleChange} /></label>
        <label>Tipo de imagen: <input type="text" className="form-control" name="tipo_imagen" value={form.tipo_imagen} onChange={handleChange} /></label>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Cargando...' : 'Guardar'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleGoBack} disabled={loading}>
        Volver
        </button>
      </form>
    </div>
  );
};

export default EditPropiedadPage;
