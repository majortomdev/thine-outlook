import React, { useCallback, useReducer } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE 
            } from '../../shared/util/validators';
import { useForm } from "../../shared/hooks/form-hook";            
import './NewReview.css';

const NewReview = () => {
    const [formState, inputHandler] =  useForm({
        title: {
            value: '',
            isValid: false
        },
        review: {
            value: '',
            isValid: false
        }
    }, false );

    const reviewSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    return (
    <form className="review-form" onSubmit={reviewSubmitHandler}>
        <Input 
            id="title"
            element="input"
            type="text" 
            label="Title" 
            validators= {[VALIDATOR_REQUIRE()]} 
            errorText= "Please enter a valid title."
            onInput={inputHandler}
        />
        <Input 
            id="review"
            element="textarea"
            label="Review" 
            validators= {[VALIDATOR_MINLENGTH(5)]} 
            errorText= "Please enter a valid reviewwww.At least 100 characters"
            onInput={inputHandler}
        />
        <Input 
            id="information"
            element="input"
            label="Information" 
            validators= {[VALIDATOR_REQUIRE()]} 
            errorText= "Please enter associated information"
            onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>Add new Review</Button>
    </form>
    );
};

export default NewReview;