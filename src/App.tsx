import React from "react";
import Header from "./components/Header";
import Top from "./components/Top";
import Search from "./components/Search";
import Calculator from "./components/Calculator";
// import Content from "./views/Content";
import "./App.less";

function App() {
  return (
    <div className="wrapper">
      <Top />
      <Search />
      <Header />
      <Calculator />
      {/* <Content/> */}
      <footer className="wrapper-footer">222</footer>
    </div>
  );
}

export default App;
