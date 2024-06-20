import React from 'react';
import { useFetch, useEnviarDelete } from '../../utils/function.js';
import { useNavigate } from 'react-router-dom';
import { urlInquilino } from '../../config/general-config.js';

const InquilinoPage = () => {
    const { data, fetchData } = useFetch(urlInquilino);
    const navigate = useNavigate();
    const { mensaje, enviarDelete } = useEnviarDelete();

    const handleCreateClick = () => {
        navigate('/inquilinos/new');
    };

    const handleDelete = (id) => {
        const deleteUrl = `${urlInquilino}/${id}`;
        enviarDelete(deleteUrl, fetchData);
    };

    const handleEdit = (id) => {
        navigate(`/inquilinos/edit/${id}`);
    };

    return (
    <div className='App'>
        <h1>Inquilinos</h1>
        <button onClick={handleCreateClick}>Crear Nuevo Inquilino</button>
        <div className='Tabla'>
            <ul>
                {mensaje && <p>{mensaje}</p>}
                {data ? (
                    data.map((inquilino) => (
                        <li key={inquilino.id}> 
                            {inquilino.nombre}
                            {inquilino.apellido}
                            {inquilino.documento}
                            {inquilino.email}
                            <button onClick={() => handleEdit(inquilino.id)}>Editar</button>
                            <button onClick={() => handleDelete(inquilino.id)}>Eliminar</button>
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

export default InquilinoPage;