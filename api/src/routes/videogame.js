require('dotenv').config();
const axios = require('axios')
const { Router } = require('express');
const { api_key } = process.env
const { Videogame, Genre } = require('../db');

const router = Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    //   console.log(id, '----- este es el id')
    try {
        if (id.length > 8) {
            const theGame = await Videogame.findByPk(
                id, {
                include: [Genre]
            })
            return res.status(200).send(theGame)
        }
        const gameApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${api_key}`);
        //  console.log(gameApi, '-------este es el console log de gameApi')
        const result = {
            id: gameApi.data.id,
            name: gameApi.data.name,
            img: gameApi.data.background_image,
            genres: gameApi.data.genres.map(g => { return { id: g.id, name: g.name } }),
            description: gameApi.data.description,
            released: gameApi.data.released,
            rating: gameApi.data.rating_top,
            platforms: gameApi.data.parent_platforms.map(p => { return { id: p.platform.id, name: p.platform.name } })
        }
        //   console.log( result, '--------este es el console log de result')
        res.status(200).json(result)
    } catch (e) {
        console.log(e)
    }
})

router.post('/', async (req, res) => {
    const { name, description, released, genres, rating, platforms, img, createdAt } = req.body;

    try {
        const createdGame = await Videogame.create({
            name, description, released, rating, platforms, img, createdAt
        });

        const generos = genres?.map(async g => {
            const gbyGame = await Genre.findByPk(g);
            createdGame.addGenres(gbyGame);
        });

        await Promise.all(generos)
        res.send('Your videogame has been created successfully')
    } catch (e) {
        console.log(e)
    }

})

module.exports = router;