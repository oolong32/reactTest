import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

let defaultStyle = {
  color: '#fff',
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
      <div style={{...defaultStyle, width: '25%', marginRight: '20px', display: 'inline-block'}}>
      <img style={{maxWidth: '100%'}} src={playlist.imageUrl} alt="" />
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
      //serverData: {},
      filterString: ''
    }
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    if (!accessToken) { return; }

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
      .then(data => this.setState({
        user: {
          name: data.display_name
        }
      }))
      //.catch(error => console.error(error));

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
      .then(data => this.setState({
        playlists: data.items.map(item => {
          console.log(item)
          return {
            name: item.name,
            imageUrl: item.images[0].url,
            songs: []
          }
        }) 
      }))
      //.catch(error => console.error(error));
  }

  render() {
    let playlistsToRender =
      this.state.user &&
      this.state.playlists
        ? this.state.playlists.filter(playlist =>
          playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase()))
        : [];
    return (
      <div className="App">
        {this.state.user ?
        <section>
          <h1 style={{...defaultStyle, fontSize: '48px'}}>
            {this.state.user.name}’s Playlists
          </h1>
          
          {this.state.playlists ? 
            <div>
              <PlaylistCounter playlists={playlistsToRender} />
              <HoursCounter playlists={playlistsToRender} />

              <Filter onTextChange={text =>
                this.setState({filterString: text})
              } />

              {playlistsToRender.map(playlist =>
                <Playlist playlist={playlist} />
              )}
            </div> : <p>This user has no playlists!?</p>} 
        </section> : <button onClick={() => {
          window.location = window.location.href.includes('localhost')
            ? 'http://localhost:8888/login'
            : 'https://better-playlists-backend-175/login';
          }}
          style={{padding: '20px', border: 'none', borderRadius: '12px', fontSize: '24px', fontWeight: 'bold', background: 'lawngreen',  marginTop: '30px'}}>Sign in with Spotify</button>
        }
      </div>
    );
  }
}

export default App;
