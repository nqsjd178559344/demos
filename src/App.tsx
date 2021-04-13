import React from "react";

import Header from "./components/Header";
import Top from "./components/Top";
import Search from "./components/Search";
// import Content from "./pages/content";
import './App.less'

function App() {
  return (
    <div className="wrapper">
      <Top/>
      <Search/>
      <Header/>
      {/* <Content/> */}
      <footer className="wrapper-footer">222</footer>
    </div>
  );
}

export default App;
