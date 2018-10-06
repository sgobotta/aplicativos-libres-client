/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
/** Redux Imports */
import { connect } from 'react-redux';
/** Custom Imports */
import Settings from 'components/settings/Settings';


class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Settings {...this.props} />
    );
  }
}

SettingsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  users: state.users,
});


const mapDispatchToProps = dispatch => ({
  dispatch: (request) => dispatch(request),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
