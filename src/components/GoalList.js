import React from "react";

const GoalList = props => {
    console.log(props.goals)
    return   (   
    <ul className='goal-list'>
        {
        props.goals.map((lump) => {
            return <li>{lump.text}</li>;
        })
        }
  </ul>
  );
};

export default GoalList;
