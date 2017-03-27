import React from 'react';

import Sidebar from './Sidebar';
import Footer from './Footer';
import Album from './Album';
import SingleAlbum from './SingleAlbum';

export default class Juke extends React.Component{
	render(){
		return(
			<div id="main" className="container-fluid">
				< Sidebar onClick={()=> this.props.returnToList()}/>
				<div className="album col-xs-10">
					{this.props.selectedAlbum.id ? this.detail() : this.list() }
				</div>	
				< Footer currentSong={this.props.currentSong} play={this.props.play} togglePlay={this.props.togglePlay} lastSong={this.props.lastSong} nextSong={this.props.nextSong} progress={this.props.progress} />	
			</div>
		)
	}

	list(){
		return(
			<div>
			  <h3>Albums</h3>
			  <div className="row">
				  {
				  	this.props.albums.map((album)=>{
				  		return (<Album key={album.id} album={album} onClick={()=>this.props.handleClick(album)}/>)
				  	})
				  }
			  </div>
		  	</div>
		)
	}

	detail(){
		return(
			<div>
	  			<SingleAlbum album={this.props.selectedAlbum} currentSong={this.props.currentSong} start={this.props.start} />
  			</div>
		)
	}
}