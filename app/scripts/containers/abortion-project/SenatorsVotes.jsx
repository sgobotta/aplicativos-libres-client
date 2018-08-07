import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVotes } from 'actions';
import Loader from 'components/Loader';
import MapChart from './../../components/Maps';


export class SenatorsVotes extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    votes: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getVotes({ voteType: 'senators' }));
  }

  render() {
    const { votes } = this.props;
    let output;
    if (votes.queryResult && votes.queryResult.data && votes.isFinished) {
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
      <div key="AbortionProject">
        {output}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { votes: state.votes };
}

export default connect(mapStateToProps)(SenatorsVotes);
