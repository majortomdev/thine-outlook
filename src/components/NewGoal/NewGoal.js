import React from "react";
import './NewGoal.css';

const NewGoal = props => {
    let textEntered = '';

    const addGoalHandler = event => {
        event.preventDefault();

        const newGoal = {
            id: Math.random().toString(),
            text: textEntered
        };

        props.onAddGoal(newGoal);
    };

    const textChangeHandler = event => {
        textEntered = event.target.value;
    }


    return (
        <form className="new-goal" onSubmit={addGoalHandler}>
            <input type="text" onChange={textChangeHandler}/>
            <button type="submit">Add Goal</button>
        </form>
    );
};

export default NewGoal;