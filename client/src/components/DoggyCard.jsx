import React from "react";
import { Link } from "react-router-dom";
import "./styles/DoggyCard.css";

export default function DoggyCard({id, image, name, temperament, minWeight, maxWeight}) {
    return(
            <Link to={`/details/${id}`}>
        <div className="DoggyCard">
                <img className="img" src={image} width="230px" height="200px" />
                <h2 className="name">{name}</h2>
                <h4 className="tempis">{temperament}</h4>
                <h4 className="weightis">{minWeight} - {maxWeight} Kg</h4>
        </div>
            </Link>
    )
};