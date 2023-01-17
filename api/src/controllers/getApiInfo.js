const axios = require('axios');
const {API_KEY}=process.env;
require("dotenv").config();
const URL = "https://api.thedogapi.com/v1/breeds";

const getApiInfo = async ()=>{
    try {
        const api = await axios(`${URL}?api_key=${API_KEY}`)
        const data = api.data.map(d=>{
            return{
                id: d.id,
                name: d.name,
                life_span: d.life_span !==null ? d.life_span : "Life Span Not Found",
                temperament: d.temperament ? d.temperament : "Temperament Not Found",
                image: d.image.url,
                minHeight:parseInt(d.height.metric.slice(0,2).trim()),
                maxHeight:parseInt(d.height.metric.slice(4).trim()),
                minWeight:parseInt(d.weight.metric.slice(0,2).trim()),
                maxWeight:parseInt(d.weight.metric.slice(4).trim()),

                
            };
        })
        return data;
    } catch (error) {
        console.log(error);
    };
};

module.exports = getApiInfo;
