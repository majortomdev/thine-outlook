import React, { useCallback, useReducer } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE 
            } from '../../shared/util/validators';
import './NewReview.css';

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid= true;
            for(const inputId in state.inputs){
                if(inputId === action.inputId){
                    formIsValid = formIsValid && action.isValid;
                }else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return{
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {value: action.value, isValid: action.isValid}
                },
                isValid: formIsValid
            }
        default:
            return state;
    }
};

const NewReview = () => {
    const[formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            review: {
                value: '',
                isValid: false
            }
        } ,
        isValid: false
    });
    
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({type: 'INPUT_CHANGE', 
        value: value, 
        isValid: isValid, 
        inputId: id
    });
    }, []);

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
            label="Description" 
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
        <Button type="submit" disabled={!formState.isValid}>Add a Review</Button>
    </form>
    );
};

export default NewReview;