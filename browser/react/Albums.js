import React from 'react';
import Album from './Album';

export default class Albums extends React.Component {
	render(){
		const albums = this.props.albums; 
		return (
			<div>
			  <h3>Albums</h3>
			  <div className="row">
			  {
			  	albums.map((album)=>{
			  		return (<Album key={album.id} album={album} onClick={this.props.onClick}/>)
			  	})
			  }
			  </div>
		  	</div>
		)	
	};	
};
