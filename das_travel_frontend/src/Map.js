// import logo from './logo.svg';
import './Map.css';
import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react';
// import NewForm from './NewForm'
// import Nav from './Nav'

let baseUrl = 'http://localhost:3003'

class Map extends Component {
  constructor(props){
    super(props)

    this.state = { //FIX STATE TO MATCH TRAVEL STUFF

      apikey: `access_token=${process.env.REACT_APP_API_KEY}`,

    }
  }




  render() {
    return (
      // Important! Always set the container height explicitly
      <Map google={this.props.google} zoom={14}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default Map;
