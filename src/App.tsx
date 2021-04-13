import React from "react";
import { Route,Switch,Redirect } from 'react-router-dom';
import Home from './pages/home';
import Count from './pages/count'
import './App.less'

function App() {
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/count' component={Count}/>
        <Redirect to='/' />
      </Switch> 
    </div>
  );
}

export default App;
