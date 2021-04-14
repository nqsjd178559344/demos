import React from "react";
import { Route,Switch,Redirect } from 'react-router-dom';
import Home from './pages/home';
import Count from './pages/count'
import TodoList from './pages/todoList'
import './App.less'

function App() {
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/count' component={Count}/>
        <Route exact path='/todoList' component={TodoList}/>
        <Redirect to='/' />
      </Switch> 
    </div>
  );
}

export default App;
