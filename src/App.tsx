import React from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import './App.less'

function App() {
  return (
    <div className="wrapper">
      <Header/>
      <Search/>
      <footer className="wrapper-footer">222</footer>
    </div>
  );
}

export default App;
