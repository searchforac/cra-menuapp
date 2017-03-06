const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
	place_id: String,
	restaurantName: String,
	dishes: [
		{ image: String, 
			dishName: String, 
			comment: String, 
			date: { type: Date, default: Date.now } 
		}]
});

// Create model class
const Restaurant = mongoose.model('restaurant', restaurantSchema);

// Export model
module.exports = Restaurant;

