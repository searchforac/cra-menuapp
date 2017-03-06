import React, { Component } from 'react';
import './style.css';
import GeoLocator from '../GeoLocator'

class App extends Component {
  render() {
    return (
      <div className="App">
        <GeoLocator />
      </div>
    );
  }
}

export default App;
