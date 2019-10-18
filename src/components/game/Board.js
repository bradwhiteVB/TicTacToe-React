import React from 'react';
import { Square } from './Square';
import './Board.css';

export class Board extends React.Component {
  renderSquare(i, winclass) {
    return (<Square key={"square " + i} winclass={winclass} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />);
  }
  render() {
    const boardItems = [];
    const numRows = 3;
    const numCols = 3;
    // Outer loop to create row divs
    for (let i = 0; i < numRows; i++) {
      let columns = [];
      //Inner loop to create children
      for (let j = 0; j < numCols; j++) {
        let winclass = (this.props.winpattern.indexOf((i * numCols) + j) < 0) ? '' : 'winsquare';
        columns.push(this.renderSquare((i * numCols) + j, winclass));
      }
      //Create the parent and add the children
      boardItems.push(<div key={"div" + i} className="board-row">{columns}</div>);
    }
    return (<div>
      {boardItems}
    </div>);
  }
}
