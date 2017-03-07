import React, { Component } from 'react';
import request from 'superagent';
import { Button, Glyphicon } from 'react-bootstrap'
import './style.css';


export default class ImageCapture extends Component {
	constructor(props) {
		super(props);
		this.img = ''; 
		this.state = {
			imgSrc: '',
			dish: '',
			comment: ''
		};

		this.handleImage = this.handleImage.bind(this);
		this.clearPreview = this.clearPreview.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.handleDish = this.handleDish.bind(this);
		this.handleComment = this.handleComment.bind(this);
	}

	handleImage(e) {
		this.img = e.target.files[0];
		let imgSrc =URL.createObjectURL(this.img);
		
		this.setState({
			imgSrc: imgSrc
		});

  }

  handleDish(e) {
  	let dish = e.target.value;
  	this.setState({
  		dish: dish
  	})
  }

  handleComment(e) {
  	let comment = e.target.value;
  	this.setState({
  		comment: comment
  	})
  }

  submitForm() {
  	var that = this;
  	console.log(that)
  	let uploadImage = request.post(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL)
			.field('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
			.field('file', this.img);
  	uploadImage.end((err, response) => {
  		if (err) {
  			alert(err);
  		}

  		if (response.body.secure_url !== '') {
  			let submitData = request.post(`/api/create`)
  				.send({
  					image: response.body.secure_url,
  					dishName: that.state.dish,
  					comment: that.state.comment,
  					place_id: that.props.place_id,
  					restaurantName: that.props.name
  				})
  			submitData.then( () => {
  				// Need to call parent to refresh
	  			this.props.refresh();
  			})
  		}
  	});
  }

  clearPreview() {
  	this.img = '';
  	this.setState({
  		imgSrc: '',
  		comment: '',
  		dish: ''
  	});
  }

	render() {
		return (
			<div>
					{ 
						this.state.imgSrc && 
						<img className='ImageCapture-image' src={this.state.imgSrc} role='presentation'/> 
					}
					
					{ 
						!this.state.imgSrc && 
						<div>
							<input 
								className='ImageCapture-hide' 
								onChange={this.handleImage} 
								type='file' 
								name='file'
								id='file' 
								accept='image/*' 
								capture='camera' 
							/> 	
							<label className='ImageCaptureLabel btn btn-primary' htmlFor='file'><Glyphicon glyph='camera' /></label>
						</div>
					}
					
					{ this.state.imgSrc && 
						<div>
							<label>Add the dish name</label> 
							<input className="form-control" onChange={this.handleDish} type="text"/>
		
							<label>Add a comment</label>
							<input className="form-control" onChange={this.handleComment} type="text"/>
							
							<div className='ImageCaptureButtonContainer'>											
								<button className='ImageCaptureButton btn btn-primary' onClick={this.submitForm}>Ok, send it!</button>
								<button className='ImageCaptureButton btn btn-primary' onClick={this.clearPreview}>Try again.</button>
							</div>
						</div>
					}
			</div>
		);
	}
}
