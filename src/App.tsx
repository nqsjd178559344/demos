import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/home";
import Count from "./pages/count";
import TodoList from "./pages/todoList";
import ShoppingCart from "./pages/shoppingCart";
import BScrollMovies from "./pages/BScrollMovies";
import UseRefDemo from "./pages/useRefDemo";
// import ReactUseArrayAsDom from "./pages/reactUseArrayAsDom";
import "./App.less";

function App() {
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/count" component={Count} />
        <Route exact path="/todoList" component={TodoList} />
        <Route exact path="/shoppingCart" component={ShoppingCart} />
        <Route exact path="/BScrollMovies" component={BScrollMovies} />
        <Route exact path="/useRefDemo" component={UseRefDemo} />
        {/* <Route
          exact
          path="/reactUseArrayAsDom"
          component={ReactUseArrayAsDom}
        /> */}
        <Route exact path="/propTypesDemo" component={PropTypesDemo} />
        <Route exact path="/defaultPropsDemo" component={DefaultPropsDemo} />
        <Redirect to="/useRefDemo" />
      </Switch>
    </div>
  );
}

export default App;
