import React from 'react';
import { useFetch, useEnviarDelete } from '../../utils/function.js';
import { useNavigate } from 'react-router-dom';
import { urlTipoPropiedad } from '../../config/general-config.js';

const TipoPropiedadPage = () => {
    const { data, fetchData } = useFetch(urlTipoPropiedad);
    const navigate = useNavigate();
    const { mensaje, enviarDelete } = useEnviarDelete();

    const handleCreateClick = () => {
        navigate('/tipo-propiedades/new');
    };

    const handleDelete = (id) => {
        const deleteUrl = `${urlTipoPropiedad}/${id}`;
        enviarDelete(deleteUrl, fetchData);
    };

    const handleEdit = (id) => {
        navigate(`/tipo-propiedades/edit/${id}`);
    };

    return (
        <div className='App'>
            <h1>Tipos de Propiedades</h1>
            <button onClick={handleCreateClick}>Crear Tipo de Propiedad</button>
            <div className='Tabla'>
                <ul>
                    {mensaje && <p>{mensaje}</p>}
                    {data ? (
                        data.map((tipoPropiedad) => (
                            <li key={tipoPropiedad.id}>{tipoPropiedad.nombre}
                                <button onClick={() => handleEdit(tipoPropiedad.id)}>Editar</button>
                                <button onClick={() => handleDelete(tipoPropiedad.id)}>Eliminar</button>
                            </li>
                        ))
                    ) : (
                        <li>Cargando...</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TipoPropiedadPage;