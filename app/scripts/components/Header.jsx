import React from 'react';
import PropTypes from 'prop-types';
import AppBar from './AppBar';


export default class Header extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  render() {
    const { dispatch, user } = this.props;
    return (
      <AppBar user={user} dispatch={dispatch} />
    );
  }
}
