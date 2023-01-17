import React from "react";
import {Link} from "react-router-dom";
import "./styles/DoggyLanding.css"

const DoggyLanding= ()=>{
    return(
        <div>
            <h1 className="landing">
                Dogs App
            </h1>
            <h3 className="intro">"A dog is the only thing on earth that loves you more than he loves himself."</h3>
            <Link to="/home">
                <button>Go Home</button>
            </Link>
        </div>
    )
};

export default DoggyLanding;