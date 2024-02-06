// import './App.css';
// import React, { useState} from 'react';
// import GoalList from './components/GoalList/GoalList';
// import NewGoal from './components/NewGoal/NewGoal';

// const App = () => {
//   const [courseGoals, setCourseGoals] = useState([
//     {id: 'cg1', text: 'Finish the course'},
//     {id: 'cg2', text: 'Learn the main course subjects'},
//     {id: 'cg3', text: 'Help other students in the course Q & A'}
// ]);
  
//   const addNewGoalHandler = (newGoal) => {
//     //setCourseGoals(courseGoals.concat(newGoal));
//     setCourseGoals((prevCourseGoals) => {
//       return prevCourseGoals.concat(newGoal);
//     })
//   }
  
//   return (
//     <div className='course-goals'>
//       <h2>Course goals</h2>
//       <NewGoal onAddGoal={addNewGoalHandler} />
//       <GoalList goals={courseGoals}/>
//     </div>
//   )
// };

// export default App;
















import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Users from './user/pages/Users';
import NewReview from "./reviews/pages/NewReview";

function App () {
  return <Router>
    <Switch>
    <Route path="/" exact>
      <Users />
    </Route>
    <Route path="/reviews/new" exact>
      <NewReview />
    </Route>
    <Redirect to="/" />
    </Switch>
  </Router>
}

export default App;


