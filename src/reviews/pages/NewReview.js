import React from "react";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import './NewReview.css';

const NewReview = () => {
    return (
    <form className="review-form">
        <Input 
            element="input"
            type="text" 
            label="Title" 
            validators= {[VALIDATOR_REQUIRE()]} 
            errorText= "Please enter a valid title."
        />
    </form>
    );
};

export default NewReview;