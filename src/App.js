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
import UserReviews from "./reviews/pages/UserReviews";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

function App () {
  return <Router>
    <MainNavigation />
    <main>
      <Switch>
      <Route path="/" exact>
        <Users />
      </Route>
      <Route path="/:userId/reviews" exact>
        <UserReviews />
      </Route>
      <Route path="/reviews/new" exact>
        <NewReview />
      </Route>
      <Redirect to="/" />   
      </Switch>
    </main>
  </Router>
}   //Redirect 2 lines above redirects to base if dud/invalid url is entered

export default App;


