export const Apiget = (URL) => {
  return fetch(URL)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json(); // Devuelve el JSON de la respuesta
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error; // Propaga el error para manejarlo en el componente que llama a esta función
    });
};