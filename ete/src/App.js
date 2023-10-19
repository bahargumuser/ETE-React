import React, {useState} from 'react';
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import  Homepage from "./Homepage";
import { Route, Router, Routes, Switch } from 'react-router-dom';
import Companies from './Companies';
import Products from './Products';

function App() {
  const [currentForm, setCurrentForm] = useState('login');

const toggleForm = (forName) => {
  setCurrentForm(forName);
}

  return (

    <div className="App">
      <Switch>
        <Route path='/Homepage'>
          <Homepage />
        </Route>
        <Route path='/'>
        {
        currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
      }
        </Route>
      

      
      </Switch>

    </div>

  );
  
}


export default App;
