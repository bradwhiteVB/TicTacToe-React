import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Game from '../game/Game'
import Settings from '../setup/Setup'
import NoPath from '../nopath/NoPath'


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      xIsFirst: true,
      keepTally:false,
      gameType: 'PvP'
    };
    this.setWhoStarts = this.setWhoStarts.bind(this);
    this.setKeepTally = this.setKeepTally.bind(this);
    this.setGameType = this.setGameType.bind(this);
  }
  setWhoStarts(value) {
    this.setState(state => ({
      xIsFirst: (value === 'X')
    }));
  }
  setKeepTally(value) {
    this.setState(state => ({
      keepTally: value
    }));
  }
  setGameType(value) {
    this.setState(state => ({
      gameType: value
    }));
  }

  render(){
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Settings 
                setWhoStarts={this.setWhoStarts}
                setKeepTally={this.setKeepTally}
                setGameType={this.setGameType}
                appState={this.state}
                gameLink={<Link className="pageLink" to="/game">Play Game</Link>}
              />
            </Route>
            <Route exact path="/game">
              <Game 
                xIsFirst={this.state.xIsFirst}
                keepTally={this.state.keepTally}
                gameType={this.state.gameType}
                settingsLink={<Link className="pageLink" to="/">Setup</Link>}
              />
            </Route>
            <Route path="*">
              <NoPath />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
