import React, { useEffect, useState } from "react";
export interface IProps {
    Title:string,
    Year:number,
    Poster:string
    imdbID:string
}
const Item = (props:IProps) => {

  return (<li className="movieSearchItem">
    <header>{props.Title}</header>
    <img src={props.Poster} alt={props.Title}/>
    <footer>{props.Year}</footer>
  </li>)
};

export default Item;
