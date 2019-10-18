import React from 'react';
export function GameSummary(props) {
  let tallyX = '';
  let tallyO = '';
  if (props.keepTally) {
    tallyX = <span>X: {props.tallyX}</span>;
    tallyO = <span>Y: {props.tallyO}</span>;
  }
  return (<div className="gamesummary">
    {tallyX}
    <span>{props.status}</span>
    {tallyO}
  </div>);
}
