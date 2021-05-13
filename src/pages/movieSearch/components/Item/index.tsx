import React, { useEffect, useState } from "react";
import "./index.less";
export interface IProps {
  Title: string;
  Year: number;
  Poster: string;
  imdbID: string;
}
const Item = (props: IProps) => {
  return (
    <li className="movieSearchItem">
      <header className='header'>{props.Title}</header>
      {/* <img
        src={
          props.Poster ||
          "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4118501656,2181154277&fm=26&gp=0.jpg"
        }
        alt={props.Title}
      /> */}
      <div
        className="img"
        style={{
          backgroundImage: `url(${props.Poster}),url(https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4118501656,2181154277&fm=26&gp=0.jpg)`,
        }}
      ></div>
      <footer>{props.Year}</footer>
    </li>
  );
};

export default Item;
