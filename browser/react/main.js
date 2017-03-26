import React from 'react';
import axios from "axios";

import Sidebar from './SideBar';
import Footer from './Footer';
import Album from './Album';
import Albums from './Albums';
import SingleAlbum from './SingleAlbum';
	
export default class Main extends React.Component  {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);		
		this.state = {
			albums: [],
			selectedAlbum: {songs: []}
		};

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

	render(){
		return(
			<div id="main" className="container-fluid">
				< Sidebar />
				<div className="album col-xs-10">
				{this.state.selectedAlbum.id ? "selected Album" : "list" }


				
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
				  	<div>					
			  			<SingleAlbum album={this.state.selectedAlbum}/>
		  			</div>
				</div>	
				< Footer />	
			</div>
		)
	}
}	