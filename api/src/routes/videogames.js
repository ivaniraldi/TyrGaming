require('dotenv').config();
const axios = require('axios')
const { Router } = require('express');
const { api_key } = process.env
const { Videogame, Genre } = require('../db');
const { Op } = require('sequelize')

const router = Router()

const apiGames = async () => {
    const apiGames = await axios.get(`https://api.rawg.io/api/games?key=${api_key}`);

    let gamesArray = await mapGames(apiGames.data.results); //contiene los primeros 20 juegos, es decir la hoja 1

    let next = apiGames.data.next; //puntero que cambia de pagina en la api

    while (gamesArray.length < 100) {
        const proxNext = await axios.get(next); // proximo puntero
        const sumArray = await mapGames(proxNext.data.results); //contiene la hoja siguiente con mas juegos
        gamesArray = [...gamesArray, ...sumArray];
        next = proxNext.data.next; //modifica el valor de next para cargar otra hoja de juegos 
    }
    console.log(gamesArray.length)
    return gamesArray
};

const mapGames = async (arr) => {
    const aux = arr.map(a => {
        return {
            id: a.id,
            name: a.name,
            img: a.background_image,
            genres: a.genres.map(g => { return { id: g.id, name: g.name } }),
            rating: a.rating_top,
            released: a.released
        }
    })
    return aux;
};

const dbGames = async () => {
    return await Videogame.findAll({
        include: Genre
    })
};

librariGames = async () => {
    const fromApi = await apiGames();
    const fromDb = await dbGames();
    const allGames = fromDb.concat(fromApi);
    return allGames;
} //hasta aca combino ambas base de datos

router.get('/', async (req, res) => {
    const { name } = req.query;

    if (name) { //armo la condicion de que si pasan el nombre por query aparezcan los juegos con ese nombre,
        //sino hay query aparace la lista entera de juegos

        const reGames = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${api_key}`)

        let arrGame = reGames.data.results.map(e => {
            return {
                id: e.id,
                name: e.name,
                img: e.background_image,
                genres: e.genres.map(g => g.name),
                rating: e.rating_top,
                platforms: e.parent_platforms.map(p => p.name),
                released: e.released
            }
        });

        let gameDb = await Videogame.findAll({
            where: {
                name: { [Op.like]: `%${name}%` }
            },
            include: Genre
        });

        let allresult = gameDb.concat(arrGame).slice(0, 15);
        if (allresult) {
            res.status(200).send(allresult);
        } else {
            res.status(404).send('not found');
        }
    } else {
        const theGames = await librariGames();
        // console.log(theGames, "-------console log the games")
        res.status(200).json(theGames);
    }
})





module.exports = router;