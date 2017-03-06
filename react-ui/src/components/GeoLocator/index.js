import React, { Component } from 'react';
import axios from 'axios';
import RestaurantList from '../RestaurantList';
import Loader from '../Loader';

export default class GeoLocator extends Component {    
  constructor(props) {
    super(props);

    this.state = {
      restaurants: ""
    };
  }

  componentWillMount() {  
    this.geoFindMe();
  }

  // github.com/gwilson/getAccurateCurrentPosition/blob/master/geo.js
  geoFindMe(geolocationSuccess, geolocationError, geoprogress, options) {
    if (!navigator.geolocation){
      alert(`Geolocation is not supported by your browser`)
      return;
    }

    var locationEventCount = 0;
    var positionsArray = [];
    var watchID;
    var timerID;
  
    options = options || {};

    // Arrow function sets 'this' to outer function's 'this'.  
    const foundPosition = (position) => {
      console.log(position.coords)
      axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude},${position.coords.longitude}&radius=250&type=restaurant&key=AIzaSyBrdvbUnuXITNngceAYtSkS1cmHuF0aD4M`)    
      .then(response => {
        console.log(response.data.results)
        this.setState({
          restaurants: response.data.results
        });
      });
    };

    const checkLocation = (position) => {
      positionsArray.push(position)
      locationEventCount++;
      // We ignore the first event unless it's the only one received because some devices seem to send a cached
      // location even when maxaimumAge is set to zero
      if ((position.coords.accuracy <= options.desiredAccuracy) && (locationEventCount > 1)) {
        clearTimeout(timerID);
        navigator.geolocation.clearWatch(watchID);
        foundPosition(position);
      } else {
          // geoprogress(position);
      }
    };

    const stopTrying = () => {
      navigator.geolocation.clearWatch(watchID);
      const position = positionsArray.sort( (a, b) => b.coords.accuracy - a.coords.accuracy).pop()
      foundPosition(position);
    };

    const onError = (error) => {
      clearTimeout(timerID);
      navigator.geolocation.clearWatch(watchID);
      console.log(error)
      // geolocationError(error);
    };

    if (!options.maxWait)            options.maxWait = 5000; // Default 10 seconds , 5 seconds for testing
    if (!options.desiredAccuracy)    options.desiredAccuracy = 20; // Default 20 meters
    if (!options.timeout)            options.timeout = options.maxWait; // Default to maxWait

    options.maximumAge = 0; // Force current locations only
    options.enableHighAccuracy = true; // Force high accuracy 

    watchID = navigator.geolocation.watchPosition(checkLocation, onError, options);
    timerID = setTimeout(stopTrying, options.maxWait); // Set a timeout that will abandon the location loop
  }

  render() {
      return (
          <div>
              { this.state.restaurants ? <RestaurantList restaurants={this.state.restaurants}/> :
                <Loader /> }
          </div>
      );
  }

}
