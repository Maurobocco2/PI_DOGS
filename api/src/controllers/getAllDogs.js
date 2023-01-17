const getDBInfo = require('./getDbInfo');
const getApiInfo = require('./getApiInfo');

const getAllDogs = async ()=>{
    const api = await getApiInfo();
    const db = await getDBInfo();
    const totalInfo = api.concat(db).sort((a,b)=>{
        return a.name < b.name ? -1 : 1
    });
    return totalInfo;
}; 

module.exports = getAllDogs;