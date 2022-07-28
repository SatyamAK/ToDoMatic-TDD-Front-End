import React, { useState } from 'react';
import './App.css';
import { AppContext } from './contexts/app.context';
import AuthenticationForm from './authentication-form'
import TaskView from './task';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState()
  const [tasks, setTasks] = useState([])
  const [token, setToken] = useState("") /*Storing token as normal variable is not good practise, should be stored it in 
                                                secure storage or something, since I am foxuinf on tdd I will not be storing it
                                                for presistence login*/

  const state = {
    'user': user,
    'loggedIn': isLoggedIn,
    'setUser': setUser,
    'setLoggedIn': setIsLoggedIn,
    'tasks': tasks,
    'setTasks': setTasks,
    'token': token,
    'setToken': setToken
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
    (state.loggedIn)?<TaskView />:
      <AuthenticationForm
        user={state.user} setUser={state.setUser} 
        setLoggedIn={state.setLoggedIn} setToken = {state.setToken}/>
  )
}
export default App;
