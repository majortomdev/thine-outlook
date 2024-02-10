import React from "react";

import Input from "../../shared/components/FormElements/Input";
import './NewReview.css';

const NewReview = () => {
    return <form className="review-form">
{/* <Input type="text" label="Title" validators= {[]} onChange={} /> */}
        <Input element="input" type="text" label="Title" />
        </form>
};

export default NewReview;