import React from 'react';

export default class Footer extends React.Component {
	render(){
		return (
			<div className="col-xs-10">
				<footer>
					{this.props.currentSong.id ? 

				        <div className="pull-left">
				          <button onClick={()=> this.props.lastSong()} className="btn btn-default">
				            <span className="glyphicon glyphicon-step-backward"></span>
				          </button>
				          <button onClick={()=> this.props.togglePlay(this.props.play)} className="btn btn-default">
				            <span className={this.props.play? "glyphicon glyphicon-pause": "glyphicon glyphicon-play"}></span>
				          </button>
				          <button onClick={()=> this.props.nextSong()} className="btn btn-default">
				            <span className="glyphicon glyphicon-step-forward"></span>
				          </button>

			        </div>
			        : ''}
			        <div className="bar">
			          <div className="progress">
			            <div className="progress-bar" style={{width: `${this.props.progress}%`}}></div>
			          </div>
			        </div>
		      	</footer>
		     </div> 		
		)
	}
}