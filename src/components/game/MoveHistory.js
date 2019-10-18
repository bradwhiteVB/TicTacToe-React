import React from 'react';
import './MoveHistory.css';
export class MoveHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moveorder: 'oldest',
    };
  }
  toggleMoveOrder() {
    this.setState({
      moveorder: (this.state.moveorder === 'newest') ? 'oldest' : 'newest',
    });
  }
  render() {
    const moves = this.props.history.map((step, move) => {
      //step = current value, move = index
      const desc = move ?
        'Go to move #' + move + ' @ ' + this.props.history[move].location :
        'Go to game start [Row, Col]';
      return (<li key={move}>
        <button onClick={() => this.props.jumpTo(move)}>
          {move === this.props.stepNumber ? <b>{desc}</b> : desc}
        </button>
      </li>);
    });
    //reverse the sort order here if needed
    if (this.state.moveorder === 'newest') {
      moves.reverse();
    }
    return (<div className="move-list">
      <button onClick={() => this.toggleMoveOrder()}>
        {this.state.moveorder === 'oldest' ? 'See Moves newset first' : 'See Moves oldest first'}
      </button>
      <ol>{moves}</ol>
    </div>);
  }
}
