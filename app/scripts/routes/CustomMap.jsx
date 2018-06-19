import React from 'react';

import { connect } from 'react-redux';
import AbortionProject from './../containers/AbortionProject';

export class CustomMap extends React.PureComponent {
  render() {
    return (
      <div key="CustomMap" className="app__route">
        <AbortionProject />
      </div>
    );
  }
}


/* istanbul ignore next */
function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(CustomMap);
