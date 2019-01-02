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
        songs: [{title: 'Foo', duration: '12345'}, {title: 'Bar', duration: '12345'}, {title: 'Baz', duration: '12345'}]
      },
      {
        name: 'Other Songs',
        songs: [{title: 'Dada', duration: '12345'}, {title: 'Dadeldü', duration: '12345'}, {title: 'Dum-di-dum', duration: '12345'}, {title: 'La-la', duration: '12345'}]
      },
      {
        name: 'Good Stuff',
        songs: [{title: 'Yo!', duration: '12345'}, {title: 'Gnak', duration: '12345'}, {title: 'Proot', duration: '12345'}, {title: 'Qwak', duration: '12345'}]
      },
      {
        name: 'The big lala',
        songs: [{title: 'Banana', duration: '12345'}, {title: 'Boo-boo', duration: '12345'}, {title: 'Bing bang', duration: '12345'}, {title: 'Ha ha ha', duration: '12345'}]
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
    let playlist = this.props.playlist;
    return (
      <div style={{...defaultStyle, width: '25%', display: 'inline-block'}}>
        <img src="" alt="" />  
      <h3 style={{...defaultStyle, textTransform: 'capitalize'}}>{playlist.name}</h3>
      <ul style={defaultStyle}>
        { playlist.songs.map(song =>
        <li>{song.title}</li>
        )}
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
          <PlaylistCounter playlists={this.state.serverData.user.playlists} />
          <HoursCounter playlists={this.state.serverData.user.playlists} />
          <Filter />
          {this.state.serverData.user.playlists.map(playlist =>
            <Playlist playlist={playlist} />
          )}
        </section> : <h1 style={defaultStyle}>Loading …</h1>
        }
      </div>
    );
  }
}

export default App;
