import axios from "axios";
export const GET_DOGGY = "GET_DOGGY";
export const DOG_BREED = 'DOG_BREED';
export const DOG_DETAIL = 'DOG_DETAIL';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const CREATE_DOGGY = "CREATE_DOGGY";
export const FILTER_BY_TEMP = 'FILTER_BY_TEMP'; 
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const WEIGHT_ORDER = 'WEIGHT_ORDER';
export const ALPH_ORDER = 'ALPH_ORDER';


export const getDogs = ()=>{
    return async dispatch => {
        try {
            const json = await axios.get("http://localhost:3001/dogs");
            return dispatch({
                type: 'GET_DOGGY',
                payload: json.data
            });
        } catch (error) {
            console.log(error);
        };
    };
};

export const dogsBreed = name => {
    return async dispatch =>{
        try {
            const json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
            return dispatch({
                type: 'DOG_BREED',
                payload: json.data
            });
        } catch (err) {
            console.error(err);
        };
    };
};

export const doggyDetail = id=>{
    return async dispatch => {
        try{
            const json = await axios.get(`http://localhost:3001/dogs/${id}`)
            return dispatch({
                type: 'DOG_DETAIL',
                payload: json.data
            });
        } catch(err) {
            console.error(err);
        };  
    };
};

export const getTemperaments = ()=>{
    return async dispatch =>{
        const json = await axios.get("http://localhost:3001/temperaments", {});
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data
        });
    };
};

export const createDoggy = payload =>{
    return async () => {
        try {
            const data = await axios.post("http://localhost:3001/dogs", payload);
            return data;
        } catch (err) {
            console.log(err);
        };
    };
};



//-------------------------------------------------

export const filterByTemp = payload =>{
    return {
        type: 'FILTER_BY_TEMP',
        payload
    };
};

export const filterByOrigin = payload =>{
    return{
        type: "FILTER_BY_ORIGIN",
        payload
    };
};

export const weightOrder = payload =>{
    return{
        type: 'WEIGHT_ORDER',
        payload
    };
};

export const alphOrder = payload =>{
    return{
        type: 'ALPH_ORDER',
        payload
    };
};