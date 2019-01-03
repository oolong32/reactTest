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
    let hours = Math.floor(totalDuration / 3600);
    let minutes = Math.floor((totalDuration % 3600) / 60);
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
        { playlist.songs.slice(0,3).map(song =>
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
      .then(playlistData => {
        let playlists = playlistData.items;
        let trackDataPromises = playlists.map(playlist => {
          let responsePromise = fetch(playlist.tracks.href, {
            headers: {'Authorization': 'Bearer ' + accessToken}
          })
          let trackDataPromise = responsePromise
            .then(response => response.json())
          return trackDataPromise;
        })
        let allTracksDataPromises =
          Promise.all(trackDataPromises)
        let playlistsPromise = allTracksDataPromises.then(trackDatas => {
          trackDatas.forEach((trackData, i) => {
            playlists[i].trackDatas = trackData.items
              .map(item => item.track)
              .map(trackData => ({
                title: trackData.name,
                duration: (trackData.duration_ms/1000)
              }))
          });
          return playlists;
        });
        return playlistsPromise;
      })
      .then(playlists => this.setState({
        playlists: playlists.map(item => {
          return {
            name: item.name,
            imageUrl: item.images[0].url,
            songs: item.trackDatas
          }
        }) 
      }))
      //.catch(error => console.error(error));
  }

  render() {
    let playlistsToRender =
      this.state.user &&
      this.state.playlists
        ? this.state.playlists.filter(playlist => {
          let filterString = this.state.filterString.toLowerCase();
          let matchesPlaylist = playlist.name.toLowerCase().includes(filterString);
          let matchesTrack = playlist.songs.slice(0, 3).find(track => track.title.toLowerCase().includes(filterString));
          return matchesPlaylist || matchesTrack;
        })
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
            : 'https://better-playlists-backend-175.herokuapp.com/login';
          }}
          style={{padding: '20px', border: 'none', borderRadius: '12px', fontSize: '24px', fontWeight: 'bold', background: 'lawngreen',  marginTop: '30px'}}>Sign in with Spotify</button>
        }
      </div>
    );
  }
}

export default App;
