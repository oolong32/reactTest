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
        songs: [{title: 'Foo', duration: 195}, {title: 'Bar', duration: 612}, {title: 'Baz', duration: 174}]
      },
      {
        name: 'Other Songs',
        songs: [{title: 'Dada', duration: 512}, {title: 'Dadeldü', duration: 452}, {title: 'Dum-di-dum', duration: 982}, {title: 'La-la', duration: 123}]
      },
      {
        name: 'Good Stuff',
        songs: [{title: 'Yo!', duration: 732}, {title: 'Gnak', duration: 823}, {title: 'Proot', duration: 835}, {title: 'Qwak', duration: 327}]
      },
      {
        name: 'The big lala',
        songs: [{title: 'Banana', duration: 394}, {title: 'Boo-boo', duration: 223}, {title: 'Bing bang', duration: 219}, {title: 'Ha ha ha', duration: 623}]
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
    let allSongs = this.props.playlists
      .reduce((songs, eachPlaylist) => {
        return songs.concat(eachPlaylist.songs);
    }, []);
    let allSongDurations = allSongs.map(song=>song.duration);
    let totalDuration = allSongDurations.length ? allSongDurations.reduce((accumulator, currentDuration) =>
      accumulator + currentDuration) : 0;
    let hours = Math.floor(totalDuration / 60);
    let minutes = Math.floor(totalDuration % 60);
    return (
      <section className="hours-counter" style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{hours} Hours, {minutes} Minutes</h2>
      </section>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div>
        <img src="" alt="" />
        <input type="text" id="filter" onKeyUp={event =>
          this.props.onTextChange(event.target.value)} />
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
    this.state = {
      serverData: {},
      filterString: ''
    }
  }

  componentDidMount() {
    setTimeout(()=> {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }

  render() {
    let playlistsToRender = this.state.serverData.user ? this.state.serverData.user.playlists
      .filter(playlist =>
        playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase())
      ) : [];
    return (
      <div className="App">
        {this.state.serverData.user ?
        <section>
          <h1 style={{...defaultStyle, fontSize: '48px'}}>
          {this.state.serverData.user.name}’s Playlists
        </h1>
          <PlaylistCounter playlists={playlistsToRender} />
          <HoursCounter playlists={playlistsToRender} />

          <Filter onTextChange={text =>
            this.setState({filterString: text})
          } />

          {playlistsToRender.map(playlist =>
            <Playlist playlist={playlist} />
          )}
        </section> : <h1 style={defaultStyle}>Loading …</h1>
        }
      </div>
    );
  }
}

export default App;
