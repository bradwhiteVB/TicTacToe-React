import React from 'react';
import './GameSummary.css';
export function GameSummary(props) {
  let tallyX = '';
  let tallyO = '';
  let statusColClass = "col-12";
  if (props.keepTally) {
    tallyX = <><div className="col-1 tally-name">X</div><div className="col-1 tally-result">{props.tallyX}</div></>;
    tallyO = <><div className="col-1 tally-name">O</div><div className="col-1 tally-result">{props.tallyO}</div></>;
    statusColClass = "col-8";
  }
  return (
    <div className="game-summary">
      {tallyX}
      <div className={statusColClass + " game-status"}>
        {props.status}
      </div>
      {tallyO}
    </div>
  );
}
