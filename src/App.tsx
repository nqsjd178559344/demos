import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/home";
import Count from "./pages/count";
import TodoList from "./pages/todoList";
import ShoppingCart from "./pages/shoppingCart";
import MovieSearch from "./pages/movieSearch";
import "./App.less";

function App() {
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/count" component={Count} />
        <Route exact path="/todoList" component={TodoList} />
        <Route exact path="/shoppingCart" component={ShoppingCart} />
        <Route exact path="/movieSearch" component={MovieSearch} />
        <Redirect to="/movieSearch" />
      </Switch>
    </div>
  );
}

export default App;
