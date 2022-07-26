import React, { useState } from 'react';
import './App.css';
import { AppContext } from './contexts/app.context';
import AuthenticationForm from './authentication-form'
import Button from './components/button';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

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

  return(
    (isLoggedIn)?<Button title ='Logout' />:<AuthenticationForm />
  )
}
export default App;
