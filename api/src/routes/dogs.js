const { Router } = require('express');
const axios = require('axios');
const router = Router();
require("dotenv").config();
const {Dog, Temperament} = require('../db.js');
const getAllDogs = require("../controllers/getAllDogs.js");


router.get('/', async(req, res) => {
    const {name} = req.query;
    const allDogs = await getAllDogs();
    try {
        if(name){
            const dogFilter = await allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
            dogFilter.length ?
            res.status(200).send(dogFilter) :
            res.status(404).send({message:'Dog not found'});
        } else {
            return res.status(200).send(allDogs);
        }
    } catch (error) {
        console.log(error.message);
    };
});

router.get('/:id', async(req, res) => {
    const {id} = req.params;
    const dogsTotal = await getAllDogs();
    const dogId = dogsTotal.filter( data => data.id == id)
    try {
        if(id){
            dogId.length ? 
            res.status(200).json(dogId) : 
            res.status(404).send(`Doggy's ID(${id}) Is Not Valid.`);
        };
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
        temperament
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

        temperament.forEach(async el => {
            const tempDb = await Temperament.findOrCreate({
                where: {name: el}
            })
            await createdDoggy.addTemperament(tempDb[0]);
        });

        res.status(200).send("Doggy Created Successfully.");
    } catch (err) {
        console.log(err);
    };
});

module.exports = router;