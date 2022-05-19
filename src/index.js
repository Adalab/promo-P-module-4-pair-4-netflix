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



server.post('/sign-up', (req, res) =>{
  console.log('sucedo?', req.body);
  
})

/*
cÓDIGO de dayana

// endpoint para añadir alguna fila 
server.post('/add', (req, res) => {
  // variables para simular los datos de la user
  const name = 'Tal';
  const brief = 'Cual';
  const img = 'URL';
  const desc = 'Mec';

  // declaración para buscar en DB
  const selectWomen = db.prepare('SELECT id FROM women name = ?');

  // .get para ejecutar la sentencia SQL con la variable name
  const foundWomen = selectWomen.get(name);

  // condición para comprobar si existe o no en DB
  if (foundWomen === undefined) {
    // declaración para insertar en DB
    const query = db.prepare(
      'INSERT INFO women (description, name, photo, brief) VALUE (?,?,?,?)'
    );

    // .run para ejecutar la sentencia SQL con las variables que simulan datos de la user
    const insertWomen = query.run(desc, name, image, brief);

    res.json({
      success: true,
      // ole esto siguiente:
      userId: insertWomen.lastInsertRowid,
    });
  } else {
    res.json({
      success: false,
      msj: 'La mujer ya existe',
    });
  }
});


*/



const staticServerPathWeb = './src/public-react'; // En esta carpeta ponemos los ficheros estáticos - La ruta es relativa desde la raiz del proyecto (servidor).
server.use(express.static(staticServerPathWeb));

const staticServerPathWebImg = './src/public-movies-images'; // En esta carpeta ponemos los ficheros estáticos - La ruta es relativa desde la raiz del proyecto (servidor).
server.use(express.static(staticServerPathWebImg));