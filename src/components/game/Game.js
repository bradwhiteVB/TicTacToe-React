import React from 'react';
import {Link} from "react-router-dom";
import './Game.css';
import { Board } from './Board';
import { MoveHistory } from './MoveHistory';
import { GameSummary } from './GameSummary';

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        location: '[Row, Col]'
      }],
      stepNumber: 0,
      xIsNext: this.props.xIsFirst,
      gameType: this.props.gameType,
      keepTally: this.props.keepTally,
      tallyX: 0,
      tallyO: 0,
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
    let winner = calculateWinner(squares);
    if(winner || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    winner = calculateWinner(squares);
    this.setState({
      history: history.concat([{
        squares: squares,
        location: rowcollocation[i],
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      tallyX: winner && winner.XorO === 'X' ? this.state.tallyX + 1 : this.state.tallyX,
      tallyO: winner && winner.XorO === 'O' ? this.state.tallyO + 1 : this.state.tallyO,
    });
  }
  
  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (this.props.xIsFirst)?(step % 2) === 0:(step % 2) !== 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if(winner){
      status = 'Winner: ' + winner.XorO;
    }else{
      status = (history.length < 10)?'Next player: ' + (this.state.xIsNext ? 'X' : 'O'):'DRAW!';
    }

    return (
      <div className="gamepage">
        <Link className="pageLink" to="/">Back to Setup</Link>
        <hr/>
        <div className="game">
          <div>
          <GameSummary
            keepTally={this.state.keepTally}
            tallyX={this.state.tallyX}
            tallyO={this.state.tallyO}
            status={status}
          />
          <Board 
            squares={current.squares}
            winpattern={winner ? winner.pattern : []}
            onClick={(i) => this.squareClick(i)}
          />
          </div>
          <MoveHistory
            history={history}
            jumpTo={(step) => this.jumpTo(step)}
            stepNumber={this.state.stepNumber}
          />
        </div>
      </div>
    );
  }
}


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
      return {XorO: squares[a],pattern:[a,b,c]};
    }
  }
  return null;
}