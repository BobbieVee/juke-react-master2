import React from 'react';
import axios from "axios";

import Sidebar from './SideBar';
import Footer from './Footer';
import Album from './Album';
import Albums from './Albums';
import SingleAlbum from './SingleAlbum';

const audio = document.createElement('audio');
	
export default class Main extends React.Component  {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);	
		this.returnToList = this.returnToList.bind(this);
		this.togglePlay = this.togglePlay.bind(this);
		this.start = this.start.bind(this);	
		this.state = {
			albums: [],
			selectedAlbum: {songs: []},
			currentSong: {name: null},
			play: false
		};
	}

	returnToList(){
		this.setState({selectedAlbum: {songs: []}})
	} 

	componentWillMount(){
		axios.get('/api/albums')
		.then((response) => response.data)
		.then((allAlbums)=> {
			allAlbums = allAlbums.map((album)=> {
				album.imageUrl = `/api/albums/${album.id}/image`;
				return album;
			})	
			this.setState({albums: allAlbums})
		})
		.catch(e => console.log(e));
	}

	handleClick(album){
		axios(`/api/albums/${album.id}`)
		.then((response)=> response.data)
		.then((album)=>{
			album.imageUrl = `/api/albums/${album.id}/image`;
			this.setState({selectedAlbum: album});
		})
	}

	list(){
		return(
			<div>
			  <h3>Albums</h3>
			  <div className="row">
				  {
				  	this.state.albums.map((album)=>{
				  		return (<Album key={album.id} album={album} onClick={()=>this.handleClick(album)}/>)
				  	})
				  }
			  </div>
		  	</div>
		)
	}

	detail(){
		return(
			<div>
	  			<SingleAlbum album={this.state.selectedAlbum} currentSong={this.state.currentSong} start={this.start}/>
  			</div>
		)
	}

	start(song){
		console.log('songId = ', song);
		this.setState({currentSong: song, play: true});
		audio.src = `/api/songs/${song.id}/audio`
		audio.play();
	}

	togglePlay(){
		let play =  this.state.play;
		this.setState({play: !play});
		play? audio.pause():audio.play();
	}	

	render(){
		return(
			<div id="main" className="container-fluid">
				< Sidebar onClick={()=> this.returnToList()}/>
				<div className="album col-xs-10">
					{this.state.selectedAlbum.id ? this.detail() : this.list() }
				</div>	
				< Footer currentSong={this.state.currentSong} play={this.state.play} togglePlay={this.togglePlay}/>	
			</div>
		)
	}
}	