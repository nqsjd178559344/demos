import React, { useEffect, useState } from "react";
import axios from "axios";
import { Divider } from "antd";
import "./index.less";
// let userInfo  = require('../../../mock/header')

// interface UserInfo {
//   title: string;
// }

const Header = () => {
  // const user: UserInfo = { title: "" };
  // const [userInfo, setUserInfo] = useState([user]);
  // useEffect(() => {
  //   axios
  //     .get("https://6070052c85c3f0001746f3fb.mockapi.io/api/header")
  //     .then(({ data }) => {
  //       setUserInfo(data);
  //     });
  // }, []);

  return (
    <>
      <header className="wrapper-header">
      <ul className="wrapper-header_ul">
        <li className="wrapper-header_ul_li active">
          <span>首页</span>
        </li>
        <li className="wrapper-header_ul_li">
          <span>书店区</span>
        </li>
        <li className="wrapper-header_ul_li">
          <span>书摊区</span>
        </li>
        <li className="wrapper-header_ul_li">
          <span>新书</span>
        </li>
        <li className="wrapper-header_ul_li">
          <span>在线拍卖</span>
        </li>
        <li className="wrapper-header_ul_li">
          <span>艺术品专场</span>
        </li>
        <li className="wrapper-header_ul_li">
          <span>动态 </span>
        </li>
      </ul>
    </header>
    </>
    
  );
};

export default Header;
