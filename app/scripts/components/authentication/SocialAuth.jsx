/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
/** Redux Imports */
import { connect } from 'react-redux';
import { loginFb } from 'actions';


class SocialAuthenticator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onFacebookResponse = (response) => {
    console.log('Facebook Response', response);
    if (response) {
      const { user } = this.props;
      const request = { user, fbData: response };
      this.props.loginFb(request);
    }
  }

  componentClicked = (event) => {
    console.log('Click Event', event);
  }

  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        { (!user.isAuthenticated || user.isAuthenticated) &&
          <FacebookLogin
            appId="321334748398061"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.onFacebookResponse}
          />
        }
      </React.Fragment>
    );
  }
}

SocialAuthenticator.propTypes = {
  loginFb: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});


const mapDispatchToProps = dispatch => ({
  loginFb: (request) => { dispatch(loginFb(request)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SocialAuthenticator);
