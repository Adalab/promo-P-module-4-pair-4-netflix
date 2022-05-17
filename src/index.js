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
  const response = moviesList;
  res.json(response);
});

const staticServerPathWeb = './src/public-react'; // En esta carpeta ponemos los ficheros estáticos - La ruta es relativa desde la raiz del proyecto (servidor).
server.use(express.static(staticServerPathWeb));

const staticServerPathWebImg = './src/public-movies-images'; // En esta carpeta ponemos los ficheros estáticos - La ruta es relativa desde la raiz del proyecto (servidor).
server.use(express.static(staticServerPathWebImg));
