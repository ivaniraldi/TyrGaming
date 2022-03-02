const { Router } = require('express');
const { Genre } = require('../db');

const router = Router();

router.get('/', async (req, res) => {

    try {
        const arr = await Genre.findAll()
        res.json(arr)
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;