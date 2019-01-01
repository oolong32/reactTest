import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultTextColor = '#fff';
let defaultStyle = {
  color: defaultTextColor,

}

class Aggregate extends Component {
  render() {
    return (
      <section className="aggregate" style={{...defaultStyle, display: 'inline-block'}}>
        <h2>Number Text</h2>
      </section>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div>
        <img src="" alt="" />
        <input type="text" id="filter" />
        <label for="filter" style={{...defaultStyle, marginLeft: '10px'}}>Filter</label>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: '25%', display: 'inline-block'}}>
        <img src="" alt="" />  
      <h3>Playlist Name</h3>
      <ul style={defaultStyle}>
        <li>Song 1</li>
        <li>Song 2</li>
        <li>Song 3</li>
      </ul>
      </div>
    );
  }
}

class App extends Component {
  render() {
    let name = 'Josef';
    let header_style = { color: 'deeppink', fontSize: '32px', fontWeight: 'bold' }
    return (
      <div className="App">
        <h1>Title</h1>
        <Aggregate></Aggregate>
        <Aggregate></Aggregate>
        <Filter></Filter>
        <Playlist></Playlist>
        <Playlist></Playlist>
        <Playlist></Playlist>
        <Playlist></Playlist>
      </div>
    );
  }
}

export default App;
