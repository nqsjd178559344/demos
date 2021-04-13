import React from "react";
import { Route,Switch,Redirect } from 'react-router-dom';
import Home from './pages/home';
import './App.less'

function App() {
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Redirect to='/' />
      </Switch> 
    </div>
  );
}

export default App;
