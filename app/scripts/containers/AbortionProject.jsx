import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDeputiesVotes } from 'actions';
import Loader from 'components/Loader';
import MapChart from './../components/Maps';


export class AbortionProject extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    votes: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getDeputiesVotes());
  }

  render() {
    const { votes } = this.props;
    let output;
    if (votes.queryResult.data && votes.isFinished) {
      output = (
        <MapChart
          votes={votes.queryResult.data}
        />
      );
    }
    else {
      output = <Loader />;
    }

    return (
      <div key="AbortionProject" className="">
        {output}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { votes: state.votes };
}

export default connect(mapStateToProps)(AbortionProject);
