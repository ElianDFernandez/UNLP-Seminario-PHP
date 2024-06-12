import React, { useState } from 'react';
import { useFindById, useEnviarForm } from '../../utils/function.js';
import { useNavigate } from 'react-router-dom';
import { urlInquilino } from '../../config/general-config.js';

const EditInquilinoPage = () => {
    const navigate = useNavigate();
    const id = window.location.pathname.split('/').pop();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [documento, setDocumento] = useState('');
    const [email, setEmail] = useState('');
    const [activo, setActivo] = useState(true);
    const { data, fetchData } = useFindById(`${urlInquilino}/${id}`);
    const { mensaje, enviarForm } = useEnviarForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = {
            nombre: nombre,
            apellido: apellido,
            documento: documento,
            email: email,
            activo: activo
        };
        const updateUrl = `${urlInquilino}/${id}`;
        setLoading(true);
        await enviarForm(form, updateUrl, 'PUT', fetchData);
        setLoading(false);
        setNombre('');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='App'>
            <h1>Editar Inquilino</h1>
            {mensaje && <p>{mensaje}</p>}
            {!data ? (
                <p>Cargando datos...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        Nombre:
                        <input type="text" placeholder={data.nombre} value={nombre} onChange={(event) => setNombre(event.target.value)} disabled={loading}/>
                    </label>
                    <label>
                        Apellido:
                        <input type="text" placeholder={data.apellido} value={apellido} onChange={(event) => setApellido(event.target.value)} disabled={loading}/>
                    </label>
                    <label>
                        Documento:
                        <input type="text" placeholder={data.documento} value={documento} onChange={(event) => setDocumento(event.target.value)} disabled={loading}/>
                    </label>
                    <label>
                        Email:
                        <input type="text" placeholder={data.email} value={email} onChange={(event) => setEmail(event.target.value)} disabled={loading}/>
                    </label>
                    <label>
                        Activo:
                        <input type="checkbox" checked={activo} onChange={(event) => setActivo(event.target.checked)} disabled={loading}/>
                    </label>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Cargando...' : 'Guardar'}
                    </button>
                    <button type="button" onClick={handleGoBack} disabled={loading}>
                        Volver
                    </button>
                </form>
            )}
        </div>
    );
};


export default EditInquilinoPage