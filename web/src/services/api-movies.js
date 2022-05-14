// login

const getMoviesFromApi = (params) => {
  // console.log(params.gender);
  // 3. Amplía la URL del fetch para enviar por query params un parámetro llamado gender que sea igual que el valor seleccionado por la usuaria.
  return fetch(`http://localhost:4000/movies?gender=${params.gender}&sort=${params.sort}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
