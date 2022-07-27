import React, { useState } from 'react';
import './App.css';
import { AppContext } from './contexts/app.context';
import AuthenticationForm from './authentication-form'
import Task from './models/task.model';
import TaskList from './task/task-list';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <div className="App">
      <AppContext.Provider value={isLoggedIn}>
        <h1>ToDoMatic</h1>
        <Wrapper />
      </AppContext.Provider>
    </div>
  );
}

export function Wrapper() {

  const isLoggedIn = React.useContext(AppContext)
  let tempTask = [ new Task('testing', true, 1) ]
  return(
    (isLoggedIn)?<TaskList taskList = {tempTask}/>:<AuthenticationForm />
  )
}
export default App;
