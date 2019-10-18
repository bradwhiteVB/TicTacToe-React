import React from 'react';
import './Square.css';
export function Square(props) {
  let className = 'square ' + props.winclass;
  return (<button className={className} onClick={() => props.onClick()}>
    {props.value}
  </button>);
}
