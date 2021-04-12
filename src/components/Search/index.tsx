import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input, Select, Button } from "antd";
import classNames from "classnames";
import "./index.less";
const { Option } = Select;

const goodsSelectAfter = (
  <Select defaultValue="onSale" className="select-after">
    <Option value="onSale">在售</Option>
    <Option value="sold">已售</Option>
  </Select>
);

const areaSelectAfter = (
  <Select defaultValue="online" className="select-after">
    <Option value="online">在拍</Option>
    <Option value="offline">已结束</Option>
  </Select>
);


interface LiList {
  value: string;
}

const Search = () => {
  const [chooseType, setChooseType] = useState("goods");
  const user: LiList = { value: "" };
  const [liList, setLiList] = useState([user]);
  useEffect(() => {
    axios
      .get("https://6070052c85c3f0001746f3fb.mockapi.io/api/hot-word")
      .then(({ data }) => {
        const [{ title }] = data;
        setLiList(title);
      });
  }, []);
  return (
    <div className="search_wrapper">
      <div className="search">
        <img
          className="search_logo"
          src="https://www.kongfz.com/static/kfz-searchBar/logo-220.png"
          alt="孔夫子旧书网-网上买书卖书、古旧书收藏品交易平台"
        />
        <div className="search_box">
          <div className="search_box_type">
            <span
              className={
                chooseType === "goods" ? "item-type hasChooseType" : "item-type"
              }
              onClick={() => setChooseType("goods")}
            >
              商品
            </span>
            <span
              className={
                chooseType === "auction area"
                  ? "item-type hasChooseType"
                  : "item-type"
              }
              onClick={() => setChooseType("auction area")}
            >
              拍卖区
            </span>
            <span
              className={classNames("indicator", {
                goods: chooseType === "goods",
                area: chooseType !== "goods",
              })}
            ></span>
          </div>
          <div className="search_box_input">
            <div className="search_box_input_border">
              {chooseType === "goods" ? (
                <Input
                  bordered={false}
                  className="search_box_input_goods"
                  key="goods"
                  addonAfter={goodsSelectAfter}
                  placeholder="商品名称、作者、出版社、ISBN"
                />
              ) : (
                <Input
                  bordered={false}
                  className="search_box_input_area"
                  placeholder="拍品名称"
                  key="area"
                  addonAfter={areaSelectAfter}
                />
              )}
              <Button className="search_box_input_btn">搜索</Button>
            </div>

            <div className="search_box_input_link">
              <span>高级搜索</span>
            </div>
          </div>
          <ul className="hotWord">
            {
              liList&& liList.map(i=>{
                return (
                  <li></li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;
