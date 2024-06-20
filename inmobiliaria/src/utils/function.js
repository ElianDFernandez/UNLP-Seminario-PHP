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
    const enviarForm = async (data, url, method = 'POST', callback = null) => {
        try {
            let config = {
                method: method,
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
            setTimeout(() => { setMensaje(''); }, 8000);
            if (callback) callback();
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
            setTimeout(() => { setMensaje(''); }, 6000);
        } catch (error) {
            console.error('Error al eliminar:', error);
        }
    };

    return { mensaje, enviarDelete };
};

export const useFindById = (url) => {
    const [data, setData] = useState(null);
    const [updateFlag, setUpdateFlag] = useState(false);
    
    useEffect(() => {
        console.log(url);
        const fetchData = async () => {
            const response = await fetch(url);
            const result = await response.json();
            setData(result);
        };
        fetchData();
    }, [url,updateFlag]);
    return { data, fetchData: () => setUpdateFlag(!updateFlag) };
}

export const useForm = (dataInicial, validacion, url, method = 'POST') => {
    const [form, setForm] = useState(dataInicial);
    const [loading, setLoading] = useState(false);
    const [errores, setErrores] = useState({});
    const { mensaje, enviarForm } = useEnviarForm();
  
    const handleChange = (event) => {
      const { name, value, type, checked } = event.target;
      const newValue = type === 'checkbox' ? checked : value;
      setForm({ ...form, [name]: newValue });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const erroresValidacion = validacion(form);
      if (!erroresValidacion) {
        setLoading(true);
        await enviarForm(form, url, method, () => {
          setLoading(false);
        });
      } else {
        setErrores(erroresValidacion);
        setTimeout(() => {
          setErrores({});
        }, 5000); // Limpiar errores después de 30 segundos
      }
    };
  
    return { form, errores, loading, handleChange, handleSubmit, mensaje };
  };