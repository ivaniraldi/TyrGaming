const { Router } = require('express');
const videogame = require('./videogame')

const videogames = require('./videogames')
const genre = require('./genre')
// Importar todos los routers;




const router = Router();

// Configurar los routers

router.use('/videogame', videogame)
router.use('/videogames', videogames)
router.use('/genres', genre)

module.exports = router;

