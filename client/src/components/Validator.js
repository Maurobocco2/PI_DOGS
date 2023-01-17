const validate = input =>{
    let errors = {};
    const regex = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/
    const regex2 = /^[0-9]*$/;
    const img = /\.(jpg|png|gif)$/i;
    const url =/^(ftp|http|https):\/\/[^ "]+$/;
    //----------------------------------------------------------------

    if(!input.name) errors.name = "Name Required";
    if(input.name.length < 4) errors.name = "The name must be at least 4 characters long.";
    if(!regex.test(input.name)) errors.name = "The name must contain only letters.";

    //----------------------------------------------------------------

    if(!input.minHeight) errors.minHeight = "Min height required";
    if(!regex2.test(input.minHeight)) errors.minHeight = "The height must only contain numbers";
    if(parseInt(input.minHeight) > parseInt(input.maxHeight)) errors.minHeight = "Minium height can't be higher than maximum height";
    if(input.minHeight === 0 || input.minHeight > 80 ) errors.minHeight = "Value can't be equal to 0 nor greater than 80cm ";
    
    //----------------------------------------------------------------

    if(!input.maxHeight) errors.maxHeight = "Max height required";
    if(!regex2.test(input.maxHeight)) errors.maxHeight = "The height must only contain numbers";
    if(parseInt(input.maxHeight) < parseInt(input.minHeight)) errors.maxHeight = "Maximum height can't be lower than minimum height";
    if(input.maxHeight === 0 || input.maxHeight > 120) errors.maxHeight = "Value can't be equal to 0 nor greater than 120cm";

    //----------------------------------------------------------------

    if(!input.minWeight) errors.minWeight = "Min weight required";
    if(!regex2.test(input.minWeight)) errors.minWeight = "The weight must only contain numbers";
    if(parseInt(input.minWeight) > parseInt(input.maxWeight)) errors.minWeight = "Minium weight can't be higher than maximum weight";
    if(input.minWeight === 0 || input.minWeight > 55) errors.minWeight = "Value can't be 0 nor greater than 55kg";

    //----------------------------------------------------------------

    if(!input.maxWeight) errors.maxWeight = "Max weight required";
    if(!regex2.test(input.maxWeight)) errors.maxWeight = "The weight must only contain numbers";
    if(parseInt(input.minWeight) > parseInt(input.maxWeight)) errors.maxWeight = "Maximum weight can't be lower than minimum weight";
    if(input.maxWeight === 0 || input.maxWeight > 100) errors.maxWeight = "Value can't be 0 nor greater than 100kg";

    //----------------------------------------------------------------

    if(!input.life_span) errors.life_span = "Life span required";
    if(!regex2.test(input.life_span)) errors.life_span="The life span must only contain numbers";

    //----------------------------------------------------------------

    if(!input.image) errors.image = "Image required";
    if(!img.test(input.image)) errors.image = "Image format not valid";
    // if(!url.test(input.image)) errors.image = "Url format not valid";

    //----------------------------------------------------------------
    
    console.log("err",errors);
    return errors;
};

export default validate;