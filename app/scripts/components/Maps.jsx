import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';

export default class App extends React.Component {
  static propTypes = {
    votes: PropTypes.array.isRequired,
  };

  render() {
    const { votes } = this.props;
    const options = {
      region: 'AR',
      resolution: 'provinces',
      colorAxis: {
        minValue: 0,
        maxValue: 100,
        colors: ['#FF0000', '#00FF00'],
      },
    };
    return (
      <div className="my-pretty-chart-container">
        <Chart
          chartType="GeoChart"
          width="100%"
          height="100%"
          data={votes}
          graph_id="GeoChart"
          options={options}
        />
      </div>
    );
  }
}
