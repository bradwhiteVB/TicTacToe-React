import React from 'react';
import './Settings.css';

export default class Settings extends React.Component {

  render() {
    return (
      <div className="Settings">
        Settings Screen
        <button 
          className="btn"
          onClick={() => this.props.toggleWhoStarts()}
        >
        Test Button
        </button>
      </div>
    );
  }
}