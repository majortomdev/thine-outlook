import './App.css';
import React from 'react';
import GoalList from './components/GoalList';

const App = () => {
  //return React.createElement('h1',{title:'This is....'}, 'How are ya, React here!');
  //or easier, thru jsx magic:

  const courseGoals = [{id: 'cg1', text: 'Finish the course'},
  {id: 'cg2', text: 'Learn the main course subjects'},
  {id: 'cg3', text: 'Help other students in the course Q & A'}];
  return (
    <div className='course-goals'>
      <h2>Course goals</h2>
      <GoalList goals={courseGoals}/>
    </div>
  )
};

export default App;
