import React from 'react';
import axios from "axios";


import Juke from './juke';

const audio = document.createElement('audio');
	
export default class Main extends React.Component  {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);	
		this.returnToList = this.returnToList.bind(this);
		this.togglePlay = this.togglePlay.bind(this);
		this.nextSong = this.nextSong.bind(this);
		this.lastSong = this.lastSong.bind(this);
		this.start = this.start.bind(this);	
		this.state = {
			albums: [],
			selectedAlbum: {songs: []},
			currentSong: {name: null},
			play: false,
			index: -1,
			progress: 0
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

	componentDidMount(){
		audio.addEventListener('ended', ()=> {
			this.nextSong() 
		});
		audio.addEventListener('timeupdate', ()=>{
			this.setState({
				progress: 100 * audio.currentTime/audio.duration
			})
		});
	}

	handleClick(album){
		axios(`/api/albums/${album.id}`)
		.then((response)=> response.data)
		.then((album)=>{
			album.imageUrl = `/api/albums/${album.id}/image`;
			this.setState({selectedAlbum: album});
		})
	}

	

	start(song, index){
		this.setState({currentSong: song, play: true, index: index});
		audio.src = `/api/songs/${song.id}/audio`
		audio.play();
	}

	nextSong(){
		if (this.state.selectedAlbum.id){
			let albumLastSongIndex = this.state.selectedAlbum.songs.length-1;
			let newIndex = this.state.index === albumLastSongIndex? 0 : this.state.index+1
			let newSong = this.state.selectedAlbum.songs[newIndex];
			this.start(newSong, newIndex);
		}
	}

	lastSong(){
		if (this.state.selectedAlbum.id){
			let albumLastSongIndex = this.state.selectedAlbum.songs.length-1;
			let newIndex = this.state.index === 0 ? albumLastSongIndex : this.state.index-1
			let newSong = this.state.selectedAlbum.songs[newIndex];
			this.start(newSong, newIndex);
		}
	}

	togglePlay(){
		let play =  this.state.play;
		play? audio.pause():audio.play();
		this.setState({play: !play});
	}

	render(){
		return(
			<div id='juke'>
				<Juke 
					currentSong={this.state.currentSong} 
					start={this.start} 
					play={this.state.play} 
					togglePlay={this.togglePlay} 	
					lastSong={this.lastSong} 
					nextSong={this.nextSong} 
					progress={this.state.progress} 
					selectedAlbum={this.state.selectedAlbum} 
					albums={this.state.albums} 
					handleClick={this.handleClick} 
					returnToList={this.returnToList}
				/>
			</div>	
		)
	}
}	