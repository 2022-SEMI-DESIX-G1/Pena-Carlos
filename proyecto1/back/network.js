const express = require('express');
const controller = require('./controller');
const router = express.Router();

router.get('/pokemon/:name', async function (req, res) {
    const { name } = req.params
    try{
        res.json(await controller.getPokemonFromCache(name))
    }
    catch (e) {
        res.status(400).json(e)
    }   
})

router.get('/ubicacion/:name', async function (req, res) {
    const { name } = req.params
    try{        
        res.json(await controller.getPokemonRutasFromCache(name))
    }
    catch (e) {
        res.json(e)
    }   
})

router.get('/especies/:name', async function (req, res) {
    const { name } = req.params
    try{        
        res.json(await controller.getPokemonEspeciesFromCache(name))
    }
    catch (e) {
        res.json(e)
    }   
})

router.get('/cache',  function (req, res) {
    const { name } = req.params
    try{        
        res.json( controller.getCache())
    }
    catch (e) {
        res.json(e)
    }   
})

module.exports = router;