import React from 'react';
import { useFetch, useEnviarDelete } from '../../utils/function.js';
import { useNavigate } from 'react-router-dom';

const TipoPropiedadPage = () => {
    const apiport = process.env.APIPORT || 8003;
    const url = `http://localhost:${apiport}/tipos_propiedad`;
    const { data, fetchData } = useFetch(url);
    const navigate = useNavigate();
    const { mensaje, enviarDelete } = useEnviarDelete();

    const handleCreateClick = () => {
        navigate('/tipo-propiedades/new');
    };

    const handleDelete = (id) => {
        const deleteUrl = `http://localhost:${apiport}/tipos_propiedad/${id}`;
        enviarDelete(deleteUrl, fetchData);
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
                            <li key={tipoPropiedad.id}>
                                {tipoPropiedad.nombre}
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