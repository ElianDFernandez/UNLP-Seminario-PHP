import React from 'react';
import { useFetch, useEnviarDelete } from '../../utils/function.js';
import { useNavigate } from 'react-router-dom';
import { urlInquilino } from '../../config/general-config.js';
import ItemComponent from '../../components/ItemComponent.jsx';

const InquilinoPage = () => {
    const { data, loading, error, fetchData } = useFetch(urlInquilino);
    const navigate = useNavigate();
    const { mensaje, enviarDelete } = useEnviarDelete();

    const handleCreateClick = () => {
        navigate('/inquilinos/new');
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Desea eliminar este inquilino?')) {
            const deleteUrl = `${urlInquilino}/${id}`;
            enviarDelete(deleteUrl, fetchData);
        }
    };

    const handleEdit = (id) => {
        navigate(`/inquilinos/edit/${id}`);
    };

    const fields = [
        { label: 'Nombre', field: 'nombre' },
        { label: 'Apellido', field: 'apellido' },
        { label: 'Documento', field: 'documento' },
        { label: 'Email', field: 'email' }
    ];

    return (
        <div className='App'>
            <h1>Inquilinos</h1>
            <button onClick={handleCreateClick}>Crear Nuevo Inquilino</button>
            <div className='Tabla'>
                {loading && <p>Cargando...</p>}
                {error && <p>Error: {error}</p>}
                {mensaje && <p>{mensaje}</p>}
                <ul>
                    {data ? (
                        data.map((inquilino) => (
                            <ItemComponent 
                                key={inquilino.id} 
                                item={inquilino} 
                                handleEdit={handleEdit} 
                                handleDelete={handleDelete} 
                                fields={fields}
                            />
                        ))
                    ) : (
                        <li>No hay inquilinos registrados.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default InquilinoPage;
