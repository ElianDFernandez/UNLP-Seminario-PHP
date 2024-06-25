import React from 'react';
import { useFetch, useEnviarDelete } from '../../utils/function.js';
import { useNavigate } from 'react-router-dom';
import { urlTipoPropiedad } from '../../config/general-config.js';
import ItemComponent from '../../components/ItemComponent.jsx';

const TipoPropiedadPage = () => {
    const { data, loading, error, fetchData } = useFetch(urlTipoPropiedad);
    const navigate = useNavigate();
    const { mensaje, enviarDelete } = useEnviarDelete();

    const handleCreateClick = () => {
        navigate('/tipo-propiedades/new');
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Desea eliminar este tipo de propiedad?')) {
            const deleteUrl = `${urlTipoPropiedad}/${id}`;
            enviarDelete(deleteUrl, fetchData);
        }
    };

    const handleEdit = (id) => {
        navigate(`/tipo-propiedades/edit/${id}`);
    };

    const fields = [
        { label: 'Nombre', field: 'nombre' }
    ];

    return (
        <div className='App'>
            <h1>Tipos de Propiedades</h1>
            <button onClick={handleCreateClick}>Crear Tipo de Propiedad</button>
            <div className='Tabla'>
                {loading && <p>Cargando...</p>}
                {error && <p>Error: {error}</p>}
                {mensaje && <p>{mensaje}</p>}
                <ul>
                    {data ? (
                        data.map((tipoPropiedad) => (
                            <ItemComponent
                                key={tipoPropiedad.id}
                                item={tipoPropiedad}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                fields={fields}
                            />
                        ))
                    ) : (
                        <li>No hay tipos de propiedades.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TipoPropiedadPage;
