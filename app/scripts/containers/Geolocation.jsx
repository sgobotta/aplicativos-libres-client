/** React Imports */
import React from 'react';
/** App Imports */
import { GeoUtils } from 'utils';

export default class Geolocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      distance: null,
    };
  }

  /**
   * Lifecycle Methods
   **/

  componentDidMount() {
    if ('geolocation' in navigator) {
      this.loadPosition();
    }
  }

  /**
   * Geolocation Methods
   **/

  loadPosition = async () => {
    try {
      const position = await this.getCurrentPosition();
      const distance = await this.getDistance(position.coords);
      console.log(`Distance: ${distance}`);
      const { latitude, longitude } = position.coords;
      this.setState({
        latitude,
        longitude,
        distance,
      });
    }
    catch (error) {
      console.log(error);
    }
  };

  getCurrentPosition = (options = {}) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  getDistance = async (coords) => new Promise(
    (resolve) => resolve(
      GeoUtils.getDistance(coords.latitude, coords.longitude, null, null)
    )
  );

  /**
   * Render Methods
   **/

  render() {
    return (
      <div style={{ color: 'white' }}>
        <p>Latitude {this.state.latitude}</p>
        <p>Longitude {this.state.longitude}</p>
        <p>Distance {this.state.distance}</p>
      </div>
    );
  }
}
