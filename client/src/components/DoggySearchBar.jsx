import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {dogsBreed} from "../redux/actions/index";
import "./styles/DoggySearchBar.css";



const DoggySearchBar = ()=>{
    const dispatch = useDispatch();
    const [name,setName] = useState("");

    const handleInput= e=>{
        e.preventDefault();
        setName(e.target.value);
    };

    const handleSubmit= e=>{
        e.preventDefault();
        let found = dogsBreed(name)
        if(!name){
            alert("Must provide a doggy name")
        } else dispatch(found);
        setName("");
    };

    const handleEnter = e =>{
        if(e.key === "Enter") handleSubmit(e);
    };       
    
    

    return(
        <div className="Bar">
            <input 
                className="doggy_search"
                type="text"
                value = {name} 
                onChange={e=>handleInput(e)}
                onKeyDown = {handleEnter}
                placeholder="Search your dog..."
            />
            <button 
                className="doggy_search_button" 
                type="submit" 
                onClick={e=>handleSubmit(e)}>
                    Submit
            </button>
        </div>
    )
};

export default DoggySearchBar;