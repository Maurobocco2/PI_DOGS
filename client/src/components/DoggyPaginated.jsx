import React from "react";
import "./styles/DoggyPaginated.css";

export default function DoggyPaginated({dogsPerPage, dogs, paginated }){
    const pageNumber =[];

    for (let i = 1; i <= Math.ceil(dogs/dogsPerPage); i++) {
        pageNumber.push(i);
    };

    return(
        <div className="pagination">
            {pageNumber?.map(num =>(
                    <button
                        key={num} 
                        type="button" 
                        className="pj" 
                        onClick={()=> paginated(num)}>
                        {num}
                    </button>
                )
            )}
        </div>
    );
}; 