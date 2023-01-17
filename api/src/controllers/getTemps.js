const axios = require('axios');
const {API_KEY}=process.env;
require("dotenv").config();
const URL = "https://api.thedogapi.com/v1/breeds";
const {Temperament} = require('../db.js');


const getTemps = async ()=>{
    try {
        const db = await Temperament.findAll();
        if (db.length === 0) {
            const temperamentApi = await axios(`${URL}?api_key=${API_KEY}`)
            const temperaments = temperamentApi.data.map(el => el.temperament?.split(", ")).flat();   
            const temps = temperaments.map(e => {
                return {
                    name: e,
                };
            }); 
            for (let i = 0; i < temps.length; i++) {
                if (temps[i].name) {
                    await Temperament.findOrCreate({
                        where: temps[i],
                    });
                };
            };
            console.log("API");
            const AllTemperaments = await Temperament.findAll();
            return AllTemperaments;
        } else {
            console.log("DB");
            return db;
        }
    } catch (error) {
        console.log(error);
    };
};

module.exports = getTemps;