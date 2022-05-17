const express = require('express');
const cors = require('cors');
const moviesList = require('./data/movies.json');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());
server.set('view engine', 'ejs');

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});


const staticServerPathWeb = './src/public-react'; // En esta carpeta ponemos los ficheros estáticos - La ruta es relativa desde la raiz del proyecto (servidor).
server.use(express.static(staticServerPathWeb));

const staticServerPathWebImg = './src/public-movies-images'; // En esta carpeta ponemos los ficheros estáticos - La ruta es relativa desde la raiz del proyecto (servidor).
server.use(express.static(staticServerPathWebImg));



server.get('/movie/:movieId', (req, res) => {
  console.log(req.params.movieId);
  const foundMovie = moviesList.movies.find(
    (movie) => movie.id === req.params.movieId
  );

  console.log(foundMovie);

  res.render('movie', {});
});

// Escribimos los endpoints que queramos
server.get('/movies', (req, res) => {
  // 2. Consolea los query params que estás recibiendo.
  // console.log(req.query.sort);

  // 3. Guarda el valor del query param de género en una constante
  // ternario para evitar que la variable se quede undefined según Iván
  const genderFilterParam = req.query.gender ? req.query.gender : '';

  // creo que no la necesitamos al final?
  const sortFilterParam = req.query.sort ? req.query.sort : 'asc';

  // podrían estar fuera?
  const compareAsc = (a, b) => {
    if (a.title > b.title) {
      return 1;
    }
    if (a.title < b.title) {
      return -1;
    }
    return 0;
  }

  const compareDesc = (a, b) => {
    if (a.title < b.title) {
      return 1;
    }
    if (a.title > b.title) {
      return -1;
    }
    return 0;
  }


  // 4.Hasta ahora estamos devolviendo todas las películas que tenemos en src/data/movies.json. Ahora tienes que filtrar dichas películas y responder con el listado filtrado.
  res.json({
    success: true,
    movies: moviesList.movies
      // Ordena por nombre
      .sort( req.query.sort === 'asc' ? compareAsc : compareDesc)
      // Filtra por género
      .filter((movie) => movie.gender.includes(genderFilterParam)),
  });


});