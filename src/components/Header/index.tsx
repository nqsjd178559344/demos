import React, { useEffect ,useState } from "react";
import axios from "axios";
import "./index.less";
// let userInfo  = require('../../../mock/header')

interface UserInfo {
  value: string;
}

const Header = () => {
  const user: UserInfo = { value: "" };
  const [userInfo, setUserInfo] = useState([user]);
  useEffect(() => {
    // axios({
    //     url:'https://6070052c85c3f0001746f3fb.mockapi.io/api/user_info',
    //     method:'GET',
    // }).then(res=>{
    //     console.log(res)
    //     // setUserInfo(res)
    // })
    axios
      .get("https://6070052c85c3f0001746f3fb.mockapi.io/api/header")
      .then(({ data }) => {
        const [{ title }] = data;
        setUserInfo(title);
      });
  }, []);

  console.log(userInfo, "userInfo");

  return (
    <header className="wrapper">
      <div className="wrapper-header">
      <span className="title">网罗天下图书 &nbsp; 传承中华文明</span>
      <div>
        <dl className="user_info">
          {userInfo &&
            userInfo.map((i) => (
              <dt className="user_info_li" key={i.value}>
                {i.value}
              </dt>
            ))}
        </dl>
        <span>送至</span>
      </div>
      </div>
    </header>
  );
};

export default Header;
