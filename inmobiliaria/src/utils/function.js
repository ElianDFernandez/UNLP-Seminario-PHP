import { useEffect, useState } from "react";

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [updateFlag, setUpdateFlag] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const result = await response.json();
            setData(result);
        };

        fetchData();
    }, [url, updateFlag]);

    return { data, fetchData: () => setUpdateFlag(!updateFlag) };
}

export const useEnviarForm = () => {
    const [mensaje, setMensaje] = useState('');
    const enviarForm = async (data, url) => {
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };
            let res = await fetch(url, config);
            let json = await res.json();
            console.log(json);
            setMensaje(json.message);
            setTimeout(() => { setMensaje(''); }, 3000);
        } catch (error) {
            console.error('Error:', error);
            setMensaje('Error de red. Por favor, inténtalo de nuevo más tarde.');
        }
    };
    return { mensaje, enviarForm };
};

export const useEnviarDelete = () => {
    const [mensaje, setMensaje] = useState('');

    const enviarDelete = async (url, callback) => {
        try {
            const response = await fetch(url, { method: 'DELETE' });
            const json = await response.json();
            setMensaje(json.message);
            console.log(json);
            callback();  // Ejecuta la callback para actualizar los datos
            setTimeout(() => { setMensaje(''); }, 3000);
        } catch (error) {
            console.error('Error al eliminar:', error);
        }
    };

    return { mensaje, enviarDelete };
};

