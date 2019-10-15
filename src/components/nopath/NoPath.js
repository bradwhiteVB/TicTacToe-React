import React from 'react';
import {Link} from "react-router-dom";
import './NoPath.css'

/*
* Purpose:  Provide a 404 type screen for poor path entry
*/
export default class NoPath extends React.Component {

  render() {
    return (
      <div className="FourOFour">
        <h1>Woops!</h1>
        <h3>We are sorry you haven't found the game yet</h3>
        <p>Try the link below to get you back on track</p>
        <Link className="pageLink" to="/">Setup</Link> 
      </div>
    );
  }
}