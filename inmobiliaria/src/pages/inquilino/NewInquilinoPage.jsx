import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEnviarForm } from '../../utils/function.js';
import { urlInquilino } from '../../config/general-config.js';

const NewInquilinoPage = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [documento, setDocumento] = useState('');
    const [email, setEmail] = useState('');
    const [activo, setActivo] = useState(true);
    const [loading, setLoading] = useState(false);
    const { mensaje, enviarForm } = useEnviarForm();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            nombre: nombre,
            apellido: apellido,
            documento: documento,
            email: email,
            activo: activo
        };
        setLoading(true);
        await enviarForm(data, urlInquilino);
        setLoading(false);
        setNombre('');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='App'>
            <h1>Crear Inquilino</h1>
            {mensaje && <p>{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} disabled={loading} required/>
                </label>
                <label>
                    Apellido:
                    <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} disabled={loading} required/>
                </label>
                <label>
                    Documento:
                    <input type="text" value={documento} onChange={(e) => setDocumento(e.target.value)} disabled={loading} required/>
                </label>
                <label>
                    Email:
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} required/>
                </label>
                <label>
                    Activo:
                    <input type="checkbox" checked={activo} onChange={(e) => setActivo(e.target.checked)} disabled={loading} required/>
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Crear'}
                </button>
                <button type="button" onClick={handleGoBack} disabled={loading}>Volver</button>
            </form>
        </div>
    );
};

export default NewInquilinoPage;