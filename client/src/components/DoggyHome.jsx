import React from "react";
import { useState,useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { 
   getDogs,
   getTemperaments,
   dogsBreed,
   filterByTemp,
   filterByOrigin,
   weightOrder,
   alphOrder
} from "../redux/actions";
import DoggyCard from "./DoggyCard";
import DoggyPaginated from "./DoggyPaginated";
import DoggySearchBar from "./DoggySearchBar";
import { Link } from "react-router-dom";
import "./styles/DoggyHome.css";

function DoggyHome() {

	const dispatch = useDispatch();
   const dogs = useSelector(state => state.dogs);
   const allTemperaments = useSelector(state => state.temperament);

   const [currentPage, setCurrentPage] = useState(1);
   const [dogsPerPage, setDogsPerPage] = useState(8);

   const lastIndex = currentPage * dogsPerPage ;
   const firstIndex = lastIndex - dogsPerPage;
   const currentDog = dogs.slice(firstIndex, lastIndex);
   
   const paginated = pageNumber=>{
      setCurrentPage(pageNumber);
   };

   const [order, setOrder]= useState('');

   useEffect(() => {
   	dispatch(getDogs());
   }, [dispatch]);

   useEffect(()=>{
      dispatch(getTemperaments());
   }, [dispatch]);

   const handleClick = e=>{
      e.preventDefault();
      dispatch(getDogs());
      dispatch(getTemperaments());    
   };
   
   const handleFilterTemp = e=>{
      e.preventDefault();
      dispatch(filterByTemp(e.target.value));
      setOrder({order});
      setCurrentPage(1);
   };

   const handleOrigin = e =>{
      e.preventDefault();
      dispatch(filterByOrigin(e.target.value));
      setCurrentPage(1);
      setOrder({order});
   };

   const handleAlphOrder = e=>{
      e.preventDefault();
      dispatch(alphOrder(e.target.value));
      setOrder({order});
      setCurrentPage(1);
   };

   const handleWeightOrder = e=>{
      e.preventDefault();
      dispatch(weightOrder(e.target.value));
      setOrder({order});
      setCurrentPage(1);
   };

   return (
      <div className="home_container">   
         <h1>Snoop Doggy Dog</h1>
            <nav>
               <Link to="/">
                  <button  className="return">←Go Back</button>
               </Link>
               <button className="reload" onClick={e=>{handleClick(e)}}>
			      	Reload Dogs
			      </button>
            </nav>
            <DoggySearchBar />

            

            <Link to = "/dog">
               <button className="btnCreate">
                  Create Doggy
               </button> 
            </Link>

         <div className="filters">
            <select className="filter_AZ" onChange={e=>{handleAlphOrder(e)}}>
               <option hidden>A-Z order</option>
               <option value="desc">All dogs A-Z</option>
               <option value="asc">All dogs Z-A</option>
            </select>

            <select className="filter_Weight" onChange={e=>{handleWeightOrder(e)}}>
               <option hidden>Filtered By Weight</option>
               <option value="Asc">Weight: Low to High</option>
               <option value="Desc">Weight: High to Low</option>
            </select>

            <select className="filter_origin" onChange={e=>handleOrigin(e)}>
               <option hidden>All Dogs</option>
               <option value="All">All</option>
               <option value="created">Created Dogs</option>
               <option value="existent">Existent Dogs</option>
            </select>

            <select className="filter_temps" onChange={e=>handleFilterTemp(e)}>
               <option hidden>Temperaments</option>
               <option value="All">All</option>
               {
                  allTemperaments?.map(temp=> (
                     <option value={temp.name}>
									{temp.name}
								</option>
							)
                     )
                  }
            </select>
         </div>
         <DoggyPaginated 
               dogsPerPage={dogsPerPage} 
               dogs={dogs.length} 
               paginated={paginated}
            />
         <div className="card_container">
            {
               currentDog?.map(el=>{
                  return(
                     <div key={el.id} className="cardHome">
                        <DoggyCard 
                           id={el.id}
                           key={el.id} 
                           image={el.image}
                           name={el.name}
                           temperament={el.temperament}
                           minWeight={el.minWeight} 
                           maxWeight={el.maxWeight} 
                        />
                     </div>
                  )
               }     
               )
            }
         </div>
            <DoggyPaginated 
               dogsPerPage={dogsPerPage} 
               dogs={dogs.length} 
               paginated={paginated}
            />

            
         
      </div>
   );
};

export default DoggyHome;