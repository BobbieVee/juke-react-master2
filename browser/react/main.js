import React from 'react';
import Sidebar from './SideBar';
import Footer from './Footer';

export default class Main extends React.Component  {
	constructor(props) {
		super(props);
		this.state = {name: 'Bobby'};
	}
	render(){
		return(
			<div id="main" className="container-fluid">
			< Sidebar />
			< Footer />
			</div>
		)
	}
}