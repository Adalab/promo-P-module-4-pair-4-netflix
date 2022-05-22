// login

const getMoviesFromApi = (data) => {
  console.log('Se están pidiendo las películas de la app', data);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC

  const dataGender = data.gender;
  const dataSort = data.sort;
  console.log('WWWW GENDER ---->', dataGender);
  console.log('WWWW SORT ---->', dataSort);
  return fetch(
    `//localhost:4000/movies?gender=${dataGender}&sort=${dataSort}`,
    {
      method: 'GET',
    }
  )
    .then((response) => response.json())
    .then((dataReturn) => {
      return dataReturn;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
