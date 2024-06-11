import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEnviarForm } from '../../utils/function.js';

const NewTipoPropiedadPage = () => {
    const [nombre, setNombre] = useState('');
    const [loading, setLoading] = useState(false); // Estado de carga
    const { mensaje, enviarForm } = useEnviarForm();
    const navigate = useNavigate();
    const apiport = process.env.APIPORT || 8003;
    const url = `http://localhost:${apiport}/tipos_propiedad`;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            nombre: nombre,
        };
        setLoading(true); // Iniciar estado de carga
        await enviarForm(data, url);
        setLoading(false); // Detener estado de carga
        setNombre(''); // Restablecer el campo de entrada después de enviar el formulario
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='App'>
            <h1>Crear Tipo de Propiedad</h1>
            {/* Renderizamos el mensaje si está presente */}
            {mensaje && <p>{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input 
                        type="text" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        disabled={loading} // Deshabilitar campo mientras se carga
                    />
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