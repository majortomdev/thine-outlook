import React, { useCallback } from "react";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import './NewReview.css';

const NewReview = () => {
    
    const titleInputHandler = useCallback((id, value, isValid) => {

    }, []);

    const reviewInputHandler = useCallback((id, value, isValid) => {

    }, []);

    return (
    <form className="review-form">
        <Input 
            id="title"
            element="input"
            type="text" 
            label="Title" 
            validators= {[VALIDATOR_REQUIRE()]} 
            errorText= "Please enter a valid title."
            onInput={titleInputHandler}
        />
        <Input 
            id="review"
            element="textarea"
            label="Description" 
            validators= {[VALIDATOR_MINLENGTH(5)]} 
            errorText= "Please enter a valid reviewwww.At least 100 characters"
            onInput={reviewInputHandler}
        />
    </form>
    );
};

export default NewReview;