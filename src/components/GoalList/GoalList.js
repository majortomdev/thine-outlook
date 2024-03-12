import React from "react";

const GoalList = props => {
    console.log(props.goals)
    return   (   
    <ul className='goal-list'>
        {
        props.goals.map((goal) => {
            return <li key={goal.id}>{"CLASS: -   "+goal.text}</li>;
        })
        }
  </ul>
  );
};

export default GoalList;
