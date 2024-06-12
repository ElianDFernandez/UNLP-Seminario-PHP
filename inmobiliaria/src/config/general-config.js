const apiport = process.env.REACT_APP_APIPORT || 80;
const urlTipoPropiedad = `http://localhost:${apiport}/tipos_propiedad`;
const urlInquilino = `http://localhost:${apiport}/inquilinos`;

export { urlTipoPropiedad, urlInquilino };
