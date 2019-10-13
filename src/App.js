import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Game from './Game'
import Settings from './Settings'


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      xIsFirst: true,
    };
    this.toggleWhoStarts = this.toggleWhoStarts.bind(this);
  }
  toggleWhoStarts() {
    this.setState(state => ({
      xIsFirst: !state.xIsFirst
    }));
  }

  render(){
    return (
      <Router>
        <div className="App">
          <ul>
            <li>
              <Link to="/">Setup</Link>
            </li>
            <li>
              <Link to="/game">Play Game</Link>
            </li>
          </ul>

          <hr />

          <Switch>
            <Route exact path="/">
              <Settings toggleWhoStarts={this.toggleWhoStarts}/>
            </Route>
            <Route path="/game">
              <Game xIsFirst={this.state.xIsFirst}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
