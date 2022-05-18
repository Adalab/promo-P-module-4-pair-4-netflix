const express = require('express');
const cors = require('cors');
const moviesList = require('./data/movies.json');
const dataBase = require('better-sqlite3');

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
  console.log('ID de la URL', req.params.movieId);
  const foundMovie = moviesList.movies.find(
    (movie) => movie.id === req.params.movieId
  );

  console.log('foundMovie', foundMovie);

  res.render('movie');
});

//Definino  la DB con la que vamos a trabajar
const db = dataBase('./src/data/netflix.db', { verbose: console.log });

// Escribimos los endpoints que queramos
server.get('/movies', (req, res) => {
  const query = db.prepare(`SELECT * FROM movies order by title`);
  const movieListDB = query.all();

  const response = {
    success: true,
    movies: movieListDB,
  };
  res.json(response);
});

const staticServerPathWeb = './src/public-react'; // En esta carpeta ponemos los ficheros estáticos - La ruta es relativa desde la raiz del proyecto (servidor).
server.use(express.static(staticServerPathWeb));

const staticServerPathWebImg = './src/public-movies-images'; // En esta carpeta ponemos los ficheros estáticos - La ruta es relativa desde la raiz del proyecto (servidor).
server.use(express.static(staticServerPathWebImg));
