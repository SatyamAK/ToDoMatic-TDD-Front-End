import './App.css';
import AuthenticationForm from './authentication-form';

function App() {
  return (
    <div className="App">
      <AuthenticationForm login = {()=>console.log('lmao')} />
    </div>
  );
}

export default App;
