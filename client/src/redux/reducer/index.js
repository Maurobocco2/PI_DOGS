import {
	GET_DOGGY, 
	DOG_BREED, 
	DOG_DETAIL,
	GET_TEMPERAMENTS, 
	CREATE_DOGGY, 
	FILTER_BY_TEMP,
	FILTER_BY_ORIGIN,
	WEIGHT_ORDER, 
	ALPH_ORDER,
} from '../actions/index';

const initialState = {
	dogs : [],
	allDogs : [],
	temperament : [],
	details : [],
}
  
const rootReducer = (state = initialState, action) => {
	switch(action.type) { 
		case GET_DOGGY:
			return {
			  ...state,
			  dogs: action.payload,
			  allDogs: action.payload,
			  details: []
			};
		
		case DOG_BREED:
			return{
				...state,
				dogs: action.payload
			};

		case DOG_DETAIL:
			return {
				...state,
				details: action.payload
			};
		
		case CREATE_DOGGY: 
			return {
				...state,
			};

		case GET_TEMPERAMENTS:
			return {
			  ...state,
			  temperament: action.payload,
			};
			
		case FILTER_BY_TEMP:
			const allDogs = [...state.allDogs];
			let dogsFiltered = action.payload === "All" ? 
			allDogs : 
			allDogs.filter(el =>el.temperament?.toLowerCase()
				.includes(action.payload.toLowerCase()));
			return { 
			  ...state,
			  dogs: dogsFiltered
			};

		case FILTER_BY_ORIGIN:
			const all = [...state.allDogs];
			const filterByDB = action.payload === "existent" ?
			all.filter(d => d.id < 300) : 
			all.filter(r => r.id.length > 3);
			return{
				...state,
				dogs: action.payload === "All" ? state.allDogs: filterByDB
			};
		
		case ALPH_ORDER:
			const dogs = [...state.allDogs];
			const orderedBreeds= action.payload === "desc" ? 
			dogs.sort((a,b) => {
			  if (a.name > b.name) return 1;
			  if (a.name < b.name) return -1;
			  return 0;
			}) :
			dogs.sort((a,b) =>{
			  if (a.name > b.name) return -1;
			  if (a.name < b.name) return 1;
			  return 0;
			});
			return {
			  ...state,
			  dogs: orderedBreeds
			};

		case WEIGHT_ORDER:
			const sortedWeights= action.payload === "Asc" ?
			[...state.dogs].sort((a,b) =>{
			  return parseInt(a.minWeight) - parseInt(b.minWeight)
			}) :
			[...state.dogs].sort((a,b) =>{
			  return parseInt(b.maxWeight) - parseInt(a.maxWeight)
			});
			return {
			  ...state,
			  dogs: sortedWeights,
			};
		
		default: 
			return state;
	};
};

export default rootReducer;
