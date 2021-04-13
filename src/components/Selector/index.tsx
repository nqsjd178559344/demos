import React, { useEffect, useState } from "react";
import axios from "axios";
import { RightOutlined } from "@ant-design/icons";
import classNames from "classnames";
import "./index.less";

export interface Item {
  id: number;
  isTitle?: boolean;
  isRemark?: boolean;
  list: Array<any>;
}

interface IProps {
  item: Item;
}

const Selector = (props: IProps) => {
  const { item } = props;
  return (
    // <div className="selector_wrapper">
    //   <div className="selector_wrapper_list">
    <div
      className={classNames("selector_wrapper_list_item", {
        item_title: item.isTitle,
        item_remark: item.isRemark,
      })}
    >
      <div className="item_text">
        <div className="text">
          {item.list.map((i) => {
            return (
              <div key={i.id}>
              <a href={i.id} className="item_title">
                {i.text}
              </a>
              </div>
            );
          })}
        </div>
        <RightOutlined />
      </div>
      <div className="detail"></div>
    </div>
    //   </div>
    // </div>
  );
};

export default Selector;
