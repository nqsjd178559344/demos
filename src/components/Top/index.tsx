import React, { useEffect, useState } from "react";
import axios from "axios";
import { Divider } from "antd";
import "./index.less";
// let userInfo  = require('../../../mock/header')

interface UserInfo {
  title: string;
}

const Header = () => {
  const user: UserInfo = { title: "" };
  const [userInfo, setUserInfo] = useState([user]);
  useEffect(() => {
    axios
      .get("https://6070052c85c3f0001746f3fb.mockapi.io/api/header")
      .then(({ data }) => {
        setUserInfo(data);
      });
  }, []);

  return (
    <header className="wrapper-top">
        <span className="title">网罗天下图书 &nbsp; 传承中华文明</span>
        <div className="user_info_wrapper">
          <dl className="user_info">
            {userInfo &&
              userInfo.map((i) => (
                <dt className="user_info_li" key={i.title}>
                  {i.title}
                </dt>
              ))}
          </dl>
          <Divider type="vertical" style={{backgroundColor: '#e2c8ca'}} />
          <span className="user_info_li">
            送至 &nbsp;
            {"上海"}
          </span>
        </div>
    </header>
  );
};

export default Header;
