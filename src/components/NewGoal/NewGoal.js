import React, { useState } from "react";
import './NewGoal.css';

const NewGoal = props => {
    const [textEntered, setTextEntered] = useState('');

    const addGoalHandler = event => {
        event.preventDefault();

        const newGoal = {
            id: Math.random().toString(),
            text: textEntered
        };

        setTextEntered('');

        props.onAddGoal(newGoal);
    };

    const textChangeHandler = event => {
        setTextEntered(event.target.value);
    }


    return (
        <form className="new-goal" onSubmit={addGoalHandler}>
            <input type="text" value={textEntered} onChange={textChangeHandler}/>
            <button type="submit">Add Goal</button>
        </form>
    );
};

export default NewGoal;