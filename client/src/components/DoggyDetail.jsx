import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams, Link} from "react-router-dom";
import { doggyDetail } from "../redux/actions";
import "./styles/DoggyDetail.css";

const DoggyDetail = () =>{
    const details = useSelector(state => state.details);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(()=>{
        dispatch(doggyDetail(id));
    },[dispatch, id]);

    return(
        <div className="details">
            <Link to="/home">
         	    <button className='btnHomeD'>←Go Home</button>
        	</Link>

            <Link to = "/dog">
                <button className="btnCreateD">
                    Create Doggy
                </button> 
            </Link>

            {
                details.length > 0 ?(
                    <div>
                        <h1 className="detail_name">{details[0].name}</h1>
                        <img className="detail_img" src={details[0].image} alt={details[0].name} width="700px" height="650px"/>
                        <h2 className="detail_temps">Tempraments: </h2>
                        <div className="tempss">
                            {
                                details[0].createdInDb ?
                                details[0].temperament.map(e => {
                                   return( 
                                        <li key={e.dog_temperament.temperamentId}>
                                             <label>
                                                 {e.name}
                                             </label>
                                        </li>
                                    )
                                }) :
                                details[0].temperament ?
                                details[0].temperament.split(", ").map(e=>{
                                    return (
                                        <h3 key={e}>
                                            <label>
                                                {e}
                                            </label>
                                        </h3>
                                    )
                                }) :
                                "Temperament Not Found"
                            }
                        </div>
                        <div className="detail_info">
                            <h3 className="detail_w">Height between: {details[0].minHeight} - {details[0].maxHeight} Cm</h3>
                            <h3 className="detail_w">Weight between: {details[0].minWeight} - {details[0].maxWeight} Kg</h3>
                            <h3 className="detail_l">Life Span: {details[0].life_span} </h3>
                        </div>
                    </div>
                ):
                <h1 className='loader'>
                    <strong>
                        Loading
                    </strong>
                </h1>
            };
        </div>
    );
};

export default DoggyDetail;