const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors')

const Restaurant = require('./models/restaurant')

const path = require('path');

const app = express();

const PORT = process.env.PORT || 5000;

// Setup middleware
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(cors()); // Cross Origin Requests helper
app.use(bodyParser.json({ type: '*/*' })); // Currently set to parse all incoming as json

// eslint-disable-next-line
mongoosePromise = global.Promise; 

// DB
mongoose.connect('mongodb://menuapp:Lbnw2XB4@ds113680.mlab.com:13680/menuapp');

mongoose.connection
	.once('open', () => console.log('Good to go!'))
	.on('error', (error) => {
		console.warn('Warning', error);
	})

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Routes
app.post('/api/create', (req, res) => {
	console.log(req.body)
	const place_id = req.body.place_id;
	const dishName = req.body.dishName;
	const restaurantName = req.body.restaurantName;
	const comment = req.body.comment;
	const image = req.body.image;
	const date = new Date();

	// See if restaurant exists
	Restaurant.findOne({place_id})
		.then(function(existingRestaurant) {
			if (existingRestaurant) {
				// Update restaurant
				const dish =	{image, dishName, comment, date};
				existingRestaurant.dishes.push(dish);
				return existingRestaurant.save();
			} else {
				// Restaurant doesnt exist.  Add all info. 
				// 
				const restaurant = new Restaurant({
					place_id, 
					restaurantName,
					dishes: [{ image, dishName, comment, date }]
				});

				return restaurant.save();
			}
		})
		.then(function(savedRestaurant) {
			res.send(savedRestaurant)
		})
})

app.get('/api/restaurant/:id', (req, res) => {
	const place_id = req.params.id;
	
	Restaurant.findOne({place_id}, function (err, restaurant) {
		res.send(restaurant)
	});
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
