import React, { useRef, useState, useEffect } from "react";
const UseRefDemo = () => {
  const [current, setCurrent] = useState(0);

  const prevCurrent = useRef(current);

  useEffect(() => {
    prevCurrent.current = current;
  }, [current]);

  return (
    <div>
      <button onClick={() => setCurrent(current + 1)}>增加</button> <br/>
      current: {current} <br/>
      prevCurrent: {prevCurrent.current}
    </div>
  );
};

export default UseRefDemo;
