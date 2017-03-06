import React, { Component } from 'react';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import './style.css';

export default class RestaurantList extends Component {

	renderRestaurants() {
		return this.props.restaurants.map( (restaurant) => {
			return (
				<ListGroupItem href={`/restaurant/${restaurant.place_id}/${restaurant.name}`}>
						{restaurant.name}
				</ListGroupItem>
			)
		});
	}

	render() {
		if(!this.props.restaurants) {
			return 	<div className='RestaurantList-container'>
								<p>Finding restaurants in your location...</p>
							</div>	
		}

		return (
			<div>
				<ListGroup>{this.renderRestaurants()}</ListGroup>		
			</div>
		);
	}

}
