import React from "react";


export default class SingleAlbum extends React.Component {
	render(){
		const album = this.props.album;
		const songs = this.props.album.songs;
		const currentSong = this.props.currentSong;
		return(
			<div>
				<div>
				<h3>{album.name}</h3>
				<img src={album.imageUrl} />
				<h4> Song playing is {currentSong.name} </h4>
				</div>
					<table className='table'>
					<thead>
					  <tr>
					    <th></th>
					    <th>Name</th>
					    <th>Artists</th>
					    <th>Genre</th>
					  </tr>
					</thead>
					<tbody>
					{
						this.props.album.songs.map((song)=>{
							// console.log('song = ', song)
							return (
								<tr key={song.id} className={currentSong.name === song.name ?'active': ''}>
								    <td>
								    {currentSong.name !== song.name ?  
								      <button className="btn btn-default btn-xs" onClick={()=>this.props.start(song)}>
								        <span className="glyphicon glyphicon-play"></span>
								      </button>
								    : ''	  
							        } 
								    </td>
								    <td>{song.name}</td>
								    <td>{song.artists.map((artist)=> artist.name).join(',')}</td>
								    <td>{song.genre}</td>
							    </tr>
					    	) 
						})
					}
					  
					</tbody>
					</table>
				</div>
		)
	}
}