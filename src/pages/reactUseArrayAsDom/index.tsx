import React from "react";
const ReactUseArrayAsDom = () => {
  return <div>1</div>;
  // !当App.tsx=>App.jsx 时, 可这么写
  // return [<li key={1}>111</li>, <li key={2}>222</li>, <li key={3}>333</li>];
};

export default ReactUseArrayAsDom;
