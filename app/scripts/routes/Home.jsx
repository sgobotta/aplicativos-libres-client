import React from 'react';
import { connect } from 'react-redux';

export class Home extends React.PureComponent {
  render() {
    return (
      <div key="Home" className="">
        <div className="">
          <div className="">
            <div className="">
              A ver qué sale de esto...
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Home);
