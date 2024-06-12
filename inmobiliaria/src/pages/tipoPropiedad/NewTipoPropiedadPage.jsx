import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEnviarForm } from '../../utils/function.js';
import { urlTipoPropiedad } from '../../config/general-config.js';

const NewTipoPropiedadPage = () => {
    const [nombre, setNombre] = useState('');
    const [loading, setLoading] = useState(false);
    const { mensaje, enviarForm } = useEnviarForm();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            nombre: nombre,
        };
        setLoading(true);
        await enviarForm(data, urlTipoPropiedad);
        setLoading(false);
        setNombre('');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='App'>
            <h1>Crear Tipo de Propiedad</h1>
            {mensaje && <p>{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} disabled={loading}/>
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Crear'}
                </button>
                <button type="button" onClick={handleGoBack} disabled={loading}>Volver</button>
            </form>
        </div>
    );
};

export default NewTipoPropiedadPage;