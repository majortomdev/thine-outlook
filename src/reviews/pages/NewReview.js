import React, { useContext } from "react";
import { useHistory } from 'react-router-dom';

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE 
            } from '../../shared/util/validators';
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";     
import './NewReview.css';

const NewReview = () => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [formState, inputHandler] =  useForm({
        title: {
            value: '',
            isValid: false
        },
        content: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false );

    const history = useHistory();

    const reviewSubmitHandler = async event => {
        event.preventDefault();

        try {
            await sendRequest(
                'http://localhost:5000/api/reviews',
                'POST',
                JSON.stringify({
                    title: formState.inputs.title.value, 
                    description: formState.inputs.description.value, 
                    content: formState.inputs.content.value, 
                    reviewer: auth.userId
                }),
                {'Content-Type': 'Application/json'}
            );
            //redirect user to new page
            history.push('/');
        } catch (err) {}
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
        <form className="review-form" onSubmit={reviewSubmitHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
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
                id="content"
                element="textarea"
                label="Content" 
                validators= {[VALIDATOR_MINLENGTH(5)]} 
                errorText= "Please enter a valid reviewwww.At least 100 characters"
                onInput={inputHandler}
            />
            <Input 
                id="description"
                element="input"
                label="Description" 
                validators= {[VALIDATOR_REQUIRE()]} 
                errorText= "Please enter associated information"
                onInput={inputHandler}
            />
            <Button type="submit" 
             disabled={!formState.isValid}>Add new Reviiew
                {/* </form>>Add new Reviiew */}
            </Button>
        </form>
        </React.Fragment>
    );
};

export default NewReview;