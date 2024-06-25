import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm ,useFetch} from "../../utils/function.js";
import { urlPropiedad,urlLocalidad,urlTipoPropiedad } from "../../config/general-config.js";

const NewPropiedadPage = () => {
  const dataInicial = {
    domicilio: "",
    localidad_id: "",
    fecha_inicio_disponibilidad: "",
    cantidad_dias: 0,
    disponible: true,
    valor_noche: 0,
    tipo_propiedad_id: "",
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
    }
    if (!form.fecha_inicio_disponibilidad) {
      errores.fecha_inicio_disponibilidad = "El campo 'fecha de inicio de disponibilidad' es obligatorio";
    }
    if (!form.cantidad_banios) {
      errores.cantidad_banios = "El campo 'cantidad de baños' es obligatorio";
    }
    if (!form.cantidad_dias) {
      errores.cantidad_dias = "El campo 'cantidad de dias' es obligatorio";
    }
    if (!form.valor_noche) {
      errores.valor_noche = "El campo 'valor de la noche' es obligatorio";
    }
    if (!form.tipo_propiedad_id) {
      errores.tipo_propiedad_id = "El campo 'tipo de propiedad' es obligatorio";
    }
    if (form.imagen) {
      const maxSizeInBytes = 50 * 1024; // 100 KB
      const fileSizeInBytes = form.imagen.length; // Usar length ya que estamos tratando con un Data URL
    
      if (fileSizeInBytes > maxSizeInBytes) {
        errores.imagen = "El tamaño de la imagen no puede ser mayor a 50 KB";
      }
    }
    return errores;
  };

  const { form, setForm, errores, loading, handleChange, handleSubmit, mensaje } = useForm(dataInicial, validacion, urlPropiedad, 'POST');

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const { data: localidades, fetchData: fetchLocalidades } = useFetch(urlLocalidad);
  const { data: tiposPropiedades, fetchData: fetchTiposPropiedades } = useFetch(urlTipoPropiedad);

  useEffect(() => {
    fetchLocalidades();
    fetchTiposPropiedades();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({
        ...form,
        imagen: reader.result,
        tipo_imagen: file.type 
      });
    };
    
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="form-container">
        <h1>Crear propiedad</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Domicilio:
            <input
              type="text"
              className="form-control"
              name="domicilio"
              value={form.domicilio}
              onChange={handleChange}
            />
          </label>
          {errores.domicilio && (
            <p className="text-danger">{errores.domicilio}</p>
          )}
          <label>
            Localidad:
            <select
              className="form-control"
              name="localidad_id"
              value={form.localidad_id}
              onChange={handleChange}
            >
              <option value="">-- Seleccione --</option>
              {localidades &&
                localidades.map((localidad) => (
                  <option key={localidad.id} value={localidad.id}>
                    {localidad.nombre}
                  </option>
                ))}
            </select>
          </label>
          {errores.localidad && (
            <p className="text-danger">{errores.localidad}</p>
          )}
          <label>
            Cant. habitaciones:
            <input
              type="number"
              className="form-control"
              name="cantidad_habitaciones"
              value={form.cantidad_habitaciones}
              onChange={handleChange}
            />
          </label>
          {errores.cantidad_habitaciones && (
            <p className="text-danger">{errores.cantidad_habitaciones}</p>
          )}
          <label>
            Cantidad de huespedes:
            <input
              type="number"
              className="form-control"
              name="cantidad_huespedes"
              value={form.cantidad_huespedes}
              onChange={handleChange}
            />
          </label>
          {errores.cantidad_huespedes && (
            <p className="text-danger">{errores.cantidad_huespedes}</p>
          )}
          <label>
            Cantidad de baños:
            <input
              type="number"
              className="form-control"
              name="cantidad_banios"
              value={form.cantidad_banios}
              onChange={handleChange}
            />
          </label>
          {errores.cantidad_banios && (
            <p className="text-danger">{errores.cantidad_banios}</p>
          )}
          <label>
            Cochera:
            <input
              type="checkbox"
              className="form-control"
              name="cochera"
              value={form.cochera}
              onChange={handleChange}
            />
          </label>
          <label>
            Fecha inicio de disponibilidad:
            <input
              type="date"
              className="form-control"
              name="fecha_inicio_disponibilidad"
              value={form.fecha_inicio_disponibilidad}
              onChange={handleChange}
            />
          </label>
          {errores.fecha_inicio_disponibilidad && (
            <p className="text-danger">{errores.fecha_inicio_disponibilidad}</p>
          )}
          <label>
            Cantidad de dias:
            <input
              type="number"
              className="form-control"
              name="cantidad_dias"
              value={form.cantidad_dias}
              onChange={handleChange}
            />
          </label>
          {errores.cantidad_dias && (
            <p className="text-danger">{errores.cantidad_dias}</p>
          )}
          <label>
            Valor de la noche:
            <input
              type="number"
              className="form-control"
              name="valor_noche"
              value={form.valor_noche}
              onChange={handleChange}
            />
          </label>
          {errores.valor_noche && (
            <p className="text-danger">{errores.valor_noche}</p>
          )}
          <label>
            Tipo de propiedad:
            <select
              className="form-control"
              name="tipo_propiedad_id"
              value={form.tipo_propiedad_id}
              onChange={handleChange}
            >
              <option value="">-- Seleccione --</option>
              {tiposPropiedades &&
                tiposPropiedades.map((tipoPropiedad) => (
                  <option key={tipoPropiedad.id} value={tipoPropiedad.id}>
                    {tipoPropiedad.nombre}
                  </option>
                ))}
            </select>
          </label>
          {errores.tipo_propiedad_id && (
            <p className="text-danger">{errores.tipo_propiedad_id}</p>
          )}
          <label>
            Imagen:
            <input
              type="file"
              className="form-control"
              name="imagen"
              onChange={handleImageChange} // Maneja el cambio en la imagen
            />
          </label>
          {errores.imagen && <p className="text-danger">{errores.imagen}</p>}
          <label>
            Tipo de imagen:
            <input
              type="text"
              className="form-control"
              name="tipo_imagen"
              value={form.tipo_imagen}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Crear</button>
          <button type="button" onClick={handleGoBack}>
            Volver
          </button>
        </form>
        <div className="alerta">{mensaje && <p>{mensaje}</p>}</div>
      </div>
    </>
  );
};

export default NewPropiedadPage;