import React, { useEffect, useState } from "react";
import { useFindById, useFetch } from "../../utils/function.js";
import { useNavigate } from "react-router-dom";
import { urlPropiedad, urlLocalidad, urlTipoPropiedad } from "../../config/general-config.js";

const DetailPropiedadPage = () => {
  const navigate = useNavigate();
  const id = window.location.pathname.split("/").pop();
  const { data: propiedad, fetchData: fetchPropiedad } = useFindById(`${urlPropiedad}/${id}`);

  const [localidadNombre, setLocalidadNombre] = useState("");
  const [tipoPropiedadNombre, setTipoPropiedadNombre] = useState("");

  const { data: localidades, fetchData: fetchLocalidades } = useFetch(urlLocalidad);
  const { data: tiposPropiedades, fetchData: fetchTiposPropiedades } = useFetch(urlTipoPropiedad);

  useEffect(() => {
    fetchLocalidades();
    fetchTiposPropiedades();
  }, []);

  useEffect(() => {
    if (propiedad && localidades && tiposPropiedades) {
      const localidad = localidades.find(localidad => localidad.id === propiedad.localidad_id);
      const tipoPropiedad = tiposPropiedades.find(tipo => tipo.id === propiedad.tipo_propiedad_id);
  
      setLocalidadNombre(localidad ? localidad.nombre : "Desconocido");
      setTipoPropiedadNombre(tipoPropiedad ? tipoPropiedad.nombre : "Desconocido");
    }
  }, [propiedad, localidades, tiposPropiedades]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!propiedad) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="App">
      <div className="detalle-container">
        <h1>Detalle de la propiedad</h1>
        <div className="detalle-item">
          <strong>Domicilio:</strong> {propiedad.domicilio}
        </div>
        <div className="detalle-item">
          <strong>Localidad:</strong> {localidadNombre}
        </div>
        <div className="detalle-item">
          <strong>Fecha de inicio de disponibilidad:</strong> {propiedad.fecha_inicio_disponibilidad}
        </div>
        <div className="detalle-item">
          <strong>Cantidad de días:</strong> {propiedad.cantidad_dias}
        </div>
        <div className="detalle-item">
          <strong>Cantidad de habitaciones:</strong> {propiedad.cantidad_habitaciones}
        </div>
        <div className="detalle-item">
          <strong>Cantidad de huéspedes:</strong> {propiedad.cantidad_huespedes}
        </div>
        <div className="detalle-item">
          <strong>Cantidad de baños:</strong> {propiedad.cantidad_banios}
        </div>
        <div className="detalle-item">
          <strong>Cochera:</strong> {propiedad.cochera ? "Sí" : "No"}
        </div>
        <div className="detalle-item">
          <strong>Disponible:</strong> {propiedad.disponible ? "Sí" : "No"}
        </div>
        <div className="detalle-item">
          <strong>Valor de la noche:</strong> {propiedad.valor_noche}
        </div>
        <div className="detalle-item">
          <strong>Tipo de propiedad:</strong> {tipoPropiedadNombre}
        </div>
        <div className="detalle-item">
          <strong>Tipo de imagen:</strong> {propiedad.tipo_imagen}
        </div>
        <div className="detalle-item">
            <strong>Imagen:</strong> 
            {propiedad.imagen && (
                <img src={propiedad.imagen} alt="Imagen de la propiedad" className="detalle-imagen" />
            )}
        </div>
        <button className="btn btn-secondary" onClick={handleGoBack}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default DetailPropiedadPage;