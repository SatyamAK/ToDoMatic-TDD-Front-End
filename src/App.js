import React, { useState } from 'react';
import './App.css';
import { AppContext } from './contexts/app.context';
import AuthenticationForm from './authentication-form'
import Task from './models/task.model';
import User from './models/user.model';
import TaskView from './task';

function App() {

  let tempTask = [ new Task('testing', true, 1) ]

  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user, setUser] = useState(new User('test', tempTask))

  const state = {
    'user': user,
    'loggedIn': isLoggedIn
  }

  return (
    <div className="App">
      <AppContext.Provider value={state}>
        <h1>ToDoMatic</h1>
        <Wrapper />
      </AppContext.Provider>
    </div>
  );
}

export function Wrapper() {

  const state = React.useContext(AppContext)
  return(
    (state.loggedIn)?<TaskView />:<AuthenticationForm />
  )
}
export default App;
