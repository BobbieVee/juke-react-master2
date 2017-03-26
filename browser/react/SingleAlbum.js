import React from "react";


export default class SingleAlbum extends React.Component {
	render(){
		const album = this.props.album;
		console.log('album = ', album);
		const songs = this.props.album.songs;
		console.log('songs = ', songs)
		return(
			<div>
				<div>
				<h3>{album.name}</h3>
				<img src={album.imageUrl} />
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
							return (
								<tr key={song.id}>
								    <td>
								      <button className="btn btn-default btn-xs">
								        <span className="glyphicon glyphicon-play"></span>
								      </button>
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