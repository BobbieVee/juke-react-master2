import React from 'react';
import Sidebar from './SideBar';
import Footer from './Footer';
import Album from './Album';
import Albums from './Albums';
import axios from "axios";
	
export default class Main extends React.Component  {
	constructor(props) {
		super(props);
		this.state = {
			albums: []
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
	render(){
		return(
			<div id="main" className="container-fluid">
				< Sidebar />
				< Albums albums={this.state.albums} />	
				< Footer />	
			</div>
		)
	}
}	