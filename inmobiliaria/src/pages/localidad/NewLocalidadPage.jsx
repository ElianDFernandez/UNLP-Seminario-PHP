import { useNavigate } from "react-router-dom";
import { useForm } from "../../utils/function";
import { urlLocalidad } from "../../config/general-config";

const NewLocalidadPage = () => {
  const dataInicial = {
    nombre: '',
  };

  const validacion = (form) => {
    const errores = {};
    let isError = false;
    if (!form.nombre.trim()) {
      errores['nombre'] = "El campo nombre es obligatorio";
      isError = true;
    }
    return isError ? errores : null;
  };

  const { form, errores, loading, handleChange, handleSubmit, mensaje } = useForm(dataInicial, validacion, urlLocalidad, 'POST');

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="App">
      <h1>Crear Localidad</h1>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" className="form-control" name="nombre" value={form.nombre} onChange={handleChange} />
          {errores?.nombre && <p className="text-danger">{errores?.nombre}</p>}
        </label>
        <button type="submit" disabled={loading}>{loading ? 'Cargando...' : 'Crear'}</button>
        <button type="button" onClick={handleGoBack} disabled={loading}>Volver</button>
      </form>
    </div>
  );
};

export default NewLocalidadPage;
