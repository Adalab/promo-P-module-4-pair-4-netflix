const express = require('express');
const cors = require('cors');
const moviesData = require('./data/movies.json');
const usersData = require('./data/users.json');
const Database = require('better-sqlite3');

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

// Indicar qué base de datos vamos a usar con la ruta relativa a la raíz del proyecto
const db = new Database('./src/data/database.db', { verbose: console.log });

// ENDPOINTS
server.get('/movies', (req, res) => {
  const genderFilterParam = req.query.gender ? req.query.gender : '';
  // const sortFilterParam = req.query.sort ? req.query.sort : 'asc';
  // const genderFilterParam = req.query.gender;
  // const sortFilterParam = req.query.sort;

  console.log('sortFilterParam --mm-->', req.query);

  // const moviesFilter = moviesData.filter((item) =>
  //   item.gender.includes(genderFilterParam)
  // );

  //
  //
  //

  if (genderFilterParam !== '') {
    // Preparamos la query
    const query = db.prepare(
      // 'SELECT * FROM movies WHERE gender = ? ORDER BY title ?'
      'SELECT * FROM movies WHERE gender = ?'
    );
    // const movieListBD = query.all(genderFilterParam, sortFilterParam);
    const movieListBD = query.all(genderFilterParam);

    const response = {
      success: true,
      movies: movieListBD,
    };
    res.json(response);
  } else {
    // const query = db.prepare('SELECT * FROM movies ORDER BY title ?');
    const query = db.prepare('SELECT * FROM movies');
    // const movieListBD = query.all(sortFilterParam);
    const movieListBD = query.all();

    const response = {
      success: true,
      movies: movieListBD,
    };
    res.json(response);
  }

  //
  //
  //
});

server.post('/login', (req, res) => {
  const emailParam = req.body.email ? req.body.email : '';
  const passwordParam = req.body.password ? req.body.password : '';

  // const userFound = usersData.find(
  //   (item) => item.email === emailParam && item.password === passwordParam
  // );

  const query = db.prepare('SELECT * FROM users WHERE email=? AND password=?');
  const userFound = query.get(emailParam, passwordParam);

  console.log('userFound', userFound);
  console.log('userFound-ID', userFound.id);

  if (userFound !== undefined) {
    return res.json({
      success: true,
      userId: userFound.id,
    });
  } else {
    return res.json({
      success: false,
      errorMessage: 'User not found :(',
    });
  }
});

server.post('/signup', (req, res) => {
  const emailParam = req.body.email ? req.body.email : '';
  const passwordParam = req.body.password ? req.body.password : '';

  const queryEmail = db.prepare('SELECT * FROM users WHERE email=?');
  const userFoundEmail = queryEmail.get(emailParam);

  if (userFoundEmail === undefined) {
    const query = db.prepare(
      'INSERT INTO users  (email, password)  VALUES  (?, ?)'
    );
    const newUser = query.run(emailParam, passwordParam);

    const newUserId = newUser.lastInsertRowid;
    console.log('NEWUSERID', newUserId);

    res.json({
      success: true,
      userId: newUserId,
    });
  } else {
    res.json({
      success: false,
      errorMessage: 'Usuaria ya existente',
    });
  }
});

//
//
//

server.post('/user/profile', (req, res) => {
  console.log('/user/profile---> Body', req.body);
  console.log('/user/profile---> Headers', req.headers);
});

//
//
//

server.get('/movie/:movieId', (req, res) => {
  const idMovie = req.params.movieId;
  console.log('ID de la URL', idMovie);

  // const foundMovie = moviesData.find((item) => item.id === req.params.movieId);
  // console.log('foundMovie', foundMovie);

  const query = db.prepare('SELECT * FROM movies WHERE id = ?');
  const foundMovie = query.get(idMovie);

  res.render('movie', foundMovie);
});

const staticServerPathWeb = './src/public-react'; // En esta carpeta ponemos los ficheros estáticos - La ruta es relativa desde la raiz del proyecto (servidor).
server.use(express.static(staticServerPathWeb));

const staticServerPathWebImg = './src/public-movies-images'; // En esta carpeta ponemos los ficheros estáticos - La ruta es relativa desde la raiz del proyecto (servidor).
server.use(express.static(staticServerPathWebImg));

const staticServerStyles = './src/public-movies-styles';
server.use(express.static(staticServerStyles));
