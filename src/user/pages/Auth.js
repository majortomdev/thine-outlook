import React, { useContext, useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } 
        from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';

import { AuthContext } from '../../shared/context/auth-context';

import './Auth.css';

const Auth = () => {
    const auth = useContext(AuthContext);

    const [ isLoginMode, setIsLoginMode ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState();

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const switchModeHandler = () => {
        if(!isLoginMode){
            setFormData(
                {
                ...formState.inputs,    
                name: undefined
                }
                , formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false
                    }
                }, false);
        }
        setIsLoginMode(prevMode => !prevMode);
    }

    const authSubmitHandler = async event => {
        event.preventDefault();

        if(isLoginMode){

        } else {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:5000/api/users/signup', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        //'Access-Control-Allow-Origin': '*',
                        'Access-Control-Request-Headers': '*'
                         },
                         body: JSON.stringify({
                            userName: formState.inputs.name.value,
                            email: formState.inputs.email.value,
                            password: formState.inputs.password.value
                         })
                });

                const responseData = await response.json();
                console.log(responseData);
                setIsLoading(false);
                auth.login();
            } catch (err) {
                console.log(err);
                setIsLoading(false);
                setError(err.massage  || "Something went wrong, please try again.");
            }
        }
        
    }

  return (
    <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
            {!isLoginMode && (
            <><Input element="input" id="name" type="text" label="Your Name"
                validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a name."
                onInput={inputHandler} />
            <Input element="input" id="image" type="text" label="Your Image URL"
                validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a URL."
                onInput={inputHandler} /></>
            )}
            <Input 
            id="email" element="input" 
            type="email" label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
            />
            <Input 
            id="password" element="input" 
            type="password" label="Password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter a vaid password <min 8 characters>."
            onInput={inputHandler}
            />
        <Button type="submit" disabled={!formState.isValid} >
            {isLoginMode? 'LOGiiIN': 'SIGN UP'}
        </Button>

        </form>

        {isLoginMode && <p>If not already signed up:</p>}
        <Button inverse onClick={switchModeHandler}>
         {isLoginMode? 'SIiggGN UP': 'LOGggIN'}
        </Button>
        </Card>
  )
}

export default Auth
