import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

let defaultStyle = {
  color: '#fff',
}

let fakeServerData = {
  user: {
    name: 'Josef',
    playlists: [
      {
        name: 'My Favourites',
        songs: [{name: 'Foo', duration: '12345'}, {name: 'Bar', duration: '12345'}, {name: 'Baz', duration: '12345'}]
      },
      {
        name: 'Other Songs',
        songs: [{name: 'Dada', duration: '12345'}, {name: 'Dadeldü', duration: '12345'}, {name: 'Dum-di-dum', duration: '12345'}, {name: 'La-la', duration: '12345'}]
      },
      {
        name: 'Good Stuff',
        songs: [{name: 'Yo!', duration: '12345'}, {name: 'Gnak', duration: '12345'}, {name: 'Proot', duration: '12345'}, {name: 'Qwak', duration: '12345'}]
      },
      {
        name: 'The big lala',
        songs: [{name: 'Banana', duration: '12345'}, {name: 'Boo-boo', duration: '12345'}, {name: 'Bing bang', duration: '12345'}, {name: 'Ha ha ha', duration: '12345'}]
      }
    ]
  }
}

class PlaylistCounter extends Component {
  render() {
    return (
      <section className="playlist-counter" style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{this.props.playlists.length} Playlists</h2>
      </section>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist)=>{
      return songs.concat(eachPlaylist.songs);
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong)=>{
      return (sum + eachSong.duration) / 60;
    }, 0);
    return (
      <section className="hours-counter" style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{Math.round(totalDuration)} Hours</h2>
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
  constructor() {
    super();
    this.state = {serverData: {}}
  }

  componentDidMount() {
    setTimeout(()=> {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }

  render() {
    return (
      <div className="App">
        {this.state.serverData.user ?
        <section>
          <h1 style={{...defaultStyle, fontSize: '48px'}}>
          {this.state.serverData.user.name}’s Playlists
        </h1>
          <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
          <HoursCounter playlists={this.state.serverData.user.playlists}/>
          <Filter/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
        </section> : <h1 style={defaultStyle}>Loading …</h1>
        }
      </div>
    );
  }
}

export default App;
