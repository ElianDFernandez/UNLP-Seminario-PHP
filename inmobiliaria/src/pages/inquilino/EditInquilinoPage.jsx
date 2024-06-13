import React, { useState } from 'react';
import { useFindById, useEnviarForm } from '../../utils/function.js';
import { useNavigate } from 'react-router-dom';
import { urlInquilino } from '../../config/general-config.js';

const EditInquilinoPage = () => {
    const navigate = useNavigate();
    const id = window.location.pathname.split('/').pop();
    const { data, fetchData } = useFindById(`${urlInquilino}/${id}`);
    const [nombre, setNombre] = useState(data && data.nombre);
    const [apellido, setApellido] = useState(data && data.apellido);
    const [documento, setDocumento] = useState(data && data.documento);
    const [email, setEmail] = useState(data && data.email);
    const [activo, setActivo] = useState(data && data.activo);
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
                        <input type="text" defaultValue={data.nombre} placeholder={data.nombre} value={nombre} onChange={(event) => setNombre(event.target.value)} disabled={loading} required/>
                    </label>
                    <label>
                        Apellido:
                        <input type="text" defaultValue={data.apellido} placeholder={data.apellido} value={apellido} onChange={(event) => setApellido(event.target.value)} disabled={loading} required/>
                    </label>
                    <label>
                        Documento:
                        <input type="text" defaultValue={data.documento} placeholder={data.documento} value={documento} onChange={(event) => setDocumento(event.target.value)} disabled={loading} required/>
                    </label>
                    <label>
                        Email:
                        <input type="text"  defaultValue={data.email} placeholder={data.email} value={email} onChange={(event) => setEmail(event.target.value)} disabled={loading} required/>
                    </label>
                    <label>
                        Activo:
                        <input type="checkbox" defaultChecked={data.activo} checked={activo} onChange={(event) => setActivo(event.target.checked)} disabled={loading} required/>
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