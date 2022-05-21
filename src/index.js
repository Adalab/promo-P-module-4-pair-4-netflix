const express = require('express');
const cors = require('cors');
const moviesList = require('./data/movies.json');
// Day 3. Importa este fichero al principio de src/index.js y guárdalo en la constante users.
const usersList = require('./data/users.json');

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

  console.log(foundMovie);

  // Day 4. Aquí le estamos diciendo que renderice la plantilla movie con los datos foundMovie.
  res.render('movie', foundMovie);
});

//Definino  la DB con la que vamos a trabajar
const db = dataBase('./src/data/netflix.db', { verbose: console.log });

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

  const query = db.prepare(`SELECT * FROM movies order by title`);
  const movieListDB = query.all();

  const response = {
    success: true,
    movies: movieListDB,
  };
  res.json(response);
});

// Day 3. En src/index.js después del endpoint de GET:/movies añade otro endpoint con la ruta y el verbo correctos.

server.post('/login', (req, res) => {
  // Consolea los body params para ver que todo está ok
  // No está ok, req.query me llega {} o undefined :SSS
   console.log('Bon dia', req.query);

   res.json('Sep')
})




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
