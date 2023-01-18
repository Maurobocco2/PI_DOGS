import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, Link} from 'react-router-dom';
import{
    getDogs,
    getTemperaments,
    createDoggy
} from "../redux/actions/index.js"
import validate from './Validator.js';


const DoggyCreation = ()=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const allDogs = useSelector(state => state.dogs);
    const allTemperaments = useSelector(state => state.temperament);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name:"",
        minHeight:"",
        maxHeight:"",
        minWeight:"",
        maxWeight:"",
        life_span:"",
        image:"",
        temperament:[],
    });

    useEffect(()=>{
        dispatch(getTemperaments());
    }, [dispatch]);

    useEffect(()=>{
        dispatch(getDogs());
    }, [dispatch]);

    const handleInputChange = e =>{
        setInput({
            ...input,
            [e.target.name] : e.target.value,
        });
        setErrors(
            validate({
                ...input,
                [e.target.name] : e.target.value,
            })
        );
    };

    const handleSelect = e =>{
        if(!input.temperament.includes(e.target.value)){
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value]
            })
            setErrors(
                validate({
                    ...input,
                    temperament: e.target.value
                })
            );
        } else alert("Can't select the same temperament twice");
    };

    const handleDelete = e =>{
        setInput({
            ...input,
            temperament: input.temperament.filter( t=> t !== e)
        });
    };

    const handleSubmit = e =>{
        e.preventDefault();
        if(Object.values(errors).length === 0){
            alert('Doggy created successfully');
            dispatch(createDoggy(input));
            setInput({
                name:"",
                minHeight:"",
                maxHeight:"",
                minWeight:"",
                maxWeight:"",
                life_span:"",
                image:"",
                temperament:[],
            });
        } else alert ("Something went wrong, try again");
        history.push("/home");
    };


    return(
        <div className='creator'>
            <h1>Create Your Own Dog</h1>
            <Link to="/home">
         	    <button className='btnHomeD'>←Go Home</button>
            </Link>
            <form className="form_container" onSubmit={e=>{handleSubmit(e)}}>
                <div className="name_input">
                    <label>Name: </label>
                    <input
                    type='text'
                    name='name'
                    onChange={e=>handleInputChange(e)}
                    value={input.name}
                    placeholder='Type dog breed'
                    required 
                    />
                    {errors.name && <p className="danger">{errors.name}</p>}
                </div>
                <div className='h_input'>
                    <label>Minimum Height: </label>
                    <input 
                        type="number"
                        name='minHeight'
                        onChange={e=>handleInputChange(e)}
                        value={input.minHeight}
                        placeholder = "0"
                        min="0"
                        step="1"
                        max="80"
                        required 
                    />
                    {errors.minHeight && <p className="danger">{errors.minHeight}</p>}
                </div>
                <div className='h_input'>
                    <label>Max Height: </label>
                    <input 
                        type="number"
                        name='maxHeight'
                        onChange={e=>handleInputChange(e)}
                        value={input.maxHeight}
                        placeholder = "0"
                        step="1"
                        max="120"
                        required 
                    />
                    {errors.maxHeight && <p className="danger">{errors.maxHeight}</p>}
                </div>
                <div className='w_input'>
                    <label>Minimum Weight: </label>
                    <input 
                        type="number"
                        name='minWeight'
                        onChange={e=>handleInputChange(e)}
                        value = {input.minWeight}
                        placeholder = "0"
                        step="1"
                        max="55"
                        required
                    />
                    {errors.minWeight && <p className="danger">{errors.minWeight}</p>}
                </div>
                <div className='w_input'>
                    <label>Max Weight:</label>
                    <input
                        type="number"
                        name='maxWeight'
                        onChange={e=>handleInputChange(e)}
                        value = {input.maxWeight}
                        placeholder = "0"
                        step="1"
                        max="100"
                        required
                    />
                    {errors.maxWeight && <p className='danger'>{errors.maxWeight}</p>}
                </div>
                <div className='life'>
                    <label>Life Span: </label>
                    <input 
                        type="number" 
                        name='life_span'
                        onChange={e=>handleInputChange(e)}
                        value = {input.life_span}
                        placeholder = "0"
                        max="20"
                        required
                    />
                    {errors.life_span && <p className='danger'>{errors.life_span}</p>}
                </div>    
                <div className='image'>
                    <label>Doggy image: </label>
                    <input 
                        type="file"
                        name='image'
                        onChange={e=>handleInputChange(e)}
                        value = {input.image}
                        placeholder="image.jpg"
                        required 
                    />
                    {errors.image && <p className='danger'>{errors.image}</p>}
                </div>    
                <div className='temps'>
                    <label>Choose a temperament: </label>
                    <select 
                        onChange={e => handleSelect(e)}
                        className="select"
                    >
                        <option 
                            value="name" 
                            disabled
                            name="temperaments"
                        >
                            Temperaments
                        </option>
                        {allTemperaments?.map(t=>{
                            return(
                                <option 
                                    value={t.name}
                                    key={t.name}
                                    className="selected"
                                >
                                    {t.name}
                                </option>
                            );
                        })}
                    </select>
                    <div className='selected_temps'>
                        {input.temperament.map(el=>{
                            return(
                                <div key={el}>
                                    {el}
                                    <button
                                        onClick={()=>handleDelete(el)}
                                        className="deleteBtn"
                                    >
                                        ❌ 
                                    </button>
                                </div>
                            )
                        })}
                    </div>    
                </div>
                <button 
                    type='submit' 
                    name="submit-button"
                >
                    Create Dog
                </button>
            </form>
        </div>
    )     
};

export default DoggyCreation;