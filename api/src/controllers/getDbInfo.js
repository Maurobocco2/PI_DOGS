const {Temperament, Dog} = require("../db.js");

const getDBInfo = async ()=>{
    try {
        return await Dog.findAll({
            include:{
                model: Temperament,
                attributes: ["name"],
                through:{
                    attributes: []
                }
            }
        });
    } catch (error) {
        console.log(error);
    };
};

module.exports = getDBInfo;