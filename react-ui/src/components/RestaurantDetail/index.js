import React, { Component } from 'react';
import ImageCapture from '../ImageCapture';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './style.css'

export default class KitchenDetail extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			dishes: '',
			message: '',
			showDishes: false,
		};

		this.refreshPage = this.refreshPage.bind(this);

	}

	refreshPage() {
		this.forceUpdate();
	}

	componentWillMount() {
		axios.get(`/api/restaurant/${this.props.params.id}`)    
      .then(response => {
      	if (response.data === "") {
      		this.setState({
      			message: `<h1>${this.props.params.name} has no photos. Be the first to add one!</h1>`,
      		})
      	} else {
		      	this.setState({
		      		dishes: response.data.dishes,
		      		showDishes: true
		      	})
		     	}
      });
	}

	showDishes() {
		return this.state.dishes.map(dish => {
			return (
				<div className='RestaurantDetail-container'>
					<h4 className='RestaurantDetail-dishName'>{dish.dishName}</h4>
					<img className='RestaurantDetail-image' src={dish.image} role="presentation" />				
					<em className='RestaurantDetail-item'>{dish.date}</em>
					<div className='RestaurantDetail-item'>{dish.comment}</div>
				</div>
			)
		})
	}

	render() {
		if(!this.state.showDishes) {
			return (
				<div>
					<div className='RestaurantDetail-title-container'>
						<h4 className='RestaurantDetail-center-text'>{this.props.params.name}</h4>
					</div>	
					<div className='RestaurantDetail-content-container'>
						<div>
							<p>There are no photos for this restaurant yet. 
							Add a photo!</p>
							<ImageCapture place_id={this.props.params.id} name={this.props.params.name} refresh={this.refreshPage} />
						</div>
					</div>
				</div>
			)
		}

		return (
			<div>		
				{this.state.showDishes && this.showDishes()}
				<ImageCapture place_id={this.props.params.id} name={this.props.params.name} refresh={this.refreshPage} />
			</div>		
		);
	}
}
