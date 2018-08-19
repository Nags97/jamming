import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';


class Playlist extends React.Component{

  constructor(props){
    super(props);
    this.handleNameChange=this.handleNameChange.bind(this);
  }

  handleNameChange(event){
    this.props.onNameChange(event.target.value);
  }

  render(){
    return(
      <div className="Playlist" onRemove={this.props.onRemove} onChange={this.props.handleNameChange}>
      <input defaultValue={'Name Your Playlist'} onNameChange={this.props.updatePlaylistName}/>
        <TrackList />
      <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default Playlist;
