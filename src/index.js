import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  let className = 'square '+props.winclass;
  return (
    <button 
      className={className}
      onClick={() => props.onClick()}
    >
    {props.value}
    </button>
  );
}
  
class Board extends React.Component {
  renderSquare(i, winclass) {
    return (
      <Square 
        key={"square " + i}
        winclass={winclass}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const boardItems = [];
    const numRows = 3;
    const numCols = 3;

    console.log(this.props.winpattern);

    // Outer loop to create row divs
    for (let i = 0; i < numRows; i++) {
      let columns = []
      //Inner loop to create children
      for (let j = 0; j < numCols; j++) {
        let winclass = (this.props.winpattern.indexOf((i*numCols)+j) < 0)?'':'winsquare';
        columns.push(this.renderSquare((i*numCols)+j, winclass))
      }
      //Create the parent and add the children
      boardItems.push(<div key={"div"+i} className="board-row">{columns}</div>)
    }

    return (
      <div>
        {boardItems}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        location: '[Row, Col]'
      }],
      stepNumber: 0,
      xIsNext: true,
      moveorder: 'oldest',
    };
  }

  squareClick(i){
    const rowcollocation = [
      '[1, 1]','[1, 2]','[1, 3]',
      '[2, 1]','[2, 2]','[2, 3]',
      '[3, 1]','[3, 2]','[3, 3]',
    ];
    
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        location: rowcollocation[i],
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  
  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  toggleMoveOrder(){
    this.setState({
      moveorder: (this.state.moveorder === 'newest') ? 'oldest' : 'newest',
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moveorder = this.state.moveorder;

    const moves = history.map((step,move) => {
      //step = currenct value, move = index
      const desc = move ?
        'Go to move #' + move + ' @ ' + history[move].location:
        'Go to game start [Row, Col]';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {move === this.state.stepNumber ? <b>{desc}</b> : desc}
          </button>
        </li>
      );
    })

    //reverse the order here!!
    if(moveorder === 'newest'){
      moves.reverse();
    }

    let status;
    if(winner){
      status = 'Winner: ' + winner.XorY;
    }else{
      status = (moves.length < 10)?'Next player: ' + (this.state.xIsNext ? 'X' : 'O'):'DRAW!';
    }

    return (
      <div className="game">
      <div className="game-board">
        <Board 
          squares={current.squares}
          winpattern={winner ? winner.pattern : []}
          onClick={(i) => this.squareClick(i)}
        />
      </div>
      <div className="game-info">
        <div className="game-status">{status}</div>
        <button onClick={() => this.toggleMoveOrder()}>
            {this.state.moveorder === 'oldest' ? 'See Moves newset first' : 'See Moves oldest first'}
        </button>
        <ol>{moves}</ol>
      </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let i = 0; i < lines.length; i++){
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return {XorY: squares[a],pattern:[a,b,c]};
    }
  }
  return null;
}
