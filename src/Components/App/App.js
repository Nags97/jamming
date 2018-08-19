import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify'


class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      SearchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
      }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search= this.search.bind(this);
    }



    addTrack(track){
      if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
        return;
      } else {
        track.push(track);
        this.setState({playlistTracks: track});
      }
    }

    removeTrack(track){
      if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
        track.slice(track)
        this.setState({playlistTracks: track});
      }else{
        return;
      }
    }

    updatePlaylistName(name){
      this.setState({playlistName: name})
    }

    savePlaylist(){
      const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });


    search(term) {
      Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults })
    });
    }

  render(){
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar
              onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              onRemove={this.removeTrack}/>
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              updatePlaylistName={this.updatePlaylistName}
              onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
