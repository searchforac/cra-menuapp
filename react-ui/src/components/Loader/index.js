import React, { Component } from 'react';
import './style.css'

export default class Loader extends Component {
	render() {
		return (
			<div className='Loader-container'>
				<div className='Loader-position'>	
					<div className='Loader-loader'></div>
					<p className='Loader-text'>There will be food...</p>
				</div>
			
			</div>
		);
	}
}
