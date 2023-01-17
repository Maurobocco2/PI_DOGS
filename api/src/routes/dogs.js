const { Router } = require('express');
const axios = require('axios');
const router = Router();
require("dotenv").config();
const {Dog, Temperament} = require('../db.js');
const getAllDogs = require("../controllers/getAllDogs.js");


router.get('/', async(req, res) => {
    const {name} = req.query;
    const dogApi = await getAllDogs();
    try {
        if(name){
            const dogName = await dogApi.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
            dogName.length ?
            res.status(200).send(dogName) :
            res.status(404).send({message:'Dog not found'});
        } else {
            const allDogs = await getAllDogs();
            return res.status(200).send(allDogs);
        }
    } catch (error) {
        console.log(error.message);
    };
});

router.get('/:id', async(req, res) => {
    const {id} = req.params;
    const dogsTotal = await getAllDogs();
    try {
        if(id){
            const dogId = await dogsTotal.filter( data => data.id == id)
            dogId.length ? 
            res.status(200).json(dogId) : 
            res.status(404).send(`Doggy's ID(${id}) Is Not Valid.`);
        }
    } catch (error) {
        console.log(error.message);
    }; 
});

router.post('/', async(req, res)=>{
    const{
        name,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
        life_span,
        image,
        temperaments,
    } = req.body;
    try{
        const createdDoggy = await Dog.create({
            name,
            minHeight,
            maxHeight,
            minWeight,
            maxWeight,
            image,
            life_span,
        });

        const tempDb = await Temperament.findAll({
            where: {name: temperaments}
        });

        createdDoggy.addTemperament(tempDb);
        res.status(200).send("Doggy Created Successfully.");
    } catch (err) {
        console.log(err);
    };
});

module.exports = router;