import React from 'react';
import {Link} from "react-router-dom";
import './Setup.css';

/*
* Purpose:  
*   Provide a toggle selector that can be configured with 1 or more options. 
*   Clicking one of the options selects is, deselects all others in component and calls passed in function setting value
* 
* Inputs:
*   - array of objects, each object (value:<to return>, title:<displayed on button>} defining an option
*   - a function passed from the app to call with the value on click
*/
function ToggleOption(props){
  let className = 'toggleBtn '+(props.isSelected?'selected':'');
  return(
    <button 
      className={className}
      onClick={() => props.onClick()}
    >
      {props.title}
    </button>
  );
}

class ToggleSelector extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      optionSelected: this.props.default,
    };
  }
  renderToggleOption(optionObj, isSelected) {
    return (
      <ToggleOption 
        key={optionObj.value}
        value={optionObj.value}
        isSelected={isSelected}
        title={optionObj.title}
        onClick={() => this.handleClick(optionObj.value)}
      />
    );
  }
  handleClick(value){
    if(value === 'Rand'){
      value = this.randomise();
    }
    this.setState(state => ({
      optionSelected: value
    }));
    this.props.appLvlFunctionToCall(value);
  }
  randomise(){
    const values = this.props.toggleOptions.reduce((Acc, curr) => {
      if(curr.value !== 'Rand'){Acc.push(curr.value);}
      return Acc;
    },[]);
    return values[Math.floor(Math.random() * values.length)];
  }
  render(){
    //Need to loop through the items sent to the component to render each one properly
    const options = this.props.toggleOptions.map(item => this.renderToggleOption(item, (this.state.optionSelected === item.value)));
    return (
      <div className="toggleSelector">
        <div className="toggleLabelCol">
          <span className="toggleSelectorLabel">{this.props.label}</span>
        </div>
        <div className="toggleSelectorCol">
          {options}
        </div>
      </div>
    );
  }
}


/*
* Main export of the "Page component"
*/
export default class Settings extends React.Component {

  render() {
    return (
      <div className="Settings">
        <h1>Setup</h1>
        <ToggleSelector
          label='Who goes first?'
          toggleOptions={[
            {value:'X', title:'Choose X'},
            {value:'O', title:'Choose O'},
            {value:'Rand', title:'Randomise'},
          ]}
          default={(this.props.appState.xIsFirst)?'X':'O'}
          appLvlFunctionToCall={this.props.setWhoStarts}
        />

        <ToggleSelector
          label='Keep tally of wins?'
          toggleOptions={[
            {value:true, title:'Yes'},
            {value:false, title:'No'},
          ]}
          default={this.props.appState.keepTally}
          appLvlFunctionToCall={this.props.setKeepTally}
        />

        <ToggleSelector
          label='Game type'
          toggleOptions={[
            {value:'PvP', title:'Player vs Player'},
            // {value:'PvC', title:'Player vs Computer'},
          ]}
          default={this.props.appState.gameType}
          appLvlFunctionToCall={this.props.setGameType}
        />

        <Link className="pageLink" to="/game">Play Game</Link>
      </div>
    );
  }
}