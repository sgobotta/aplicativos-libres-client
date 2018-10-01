/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
/** Redux Imports */
import { connect } from 'react-redux';
/** Material UI Imports */
import Button from '@material-ui/core/Button';
/** Custom Imports */
import { loginFb } from 'actions';


class SocialAuthenticator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onResponseSuccess = (response) => {
    console.log('Facebook Response', response);
    const { authorizeFb } = this.props;
    if (response.status !== 'unknown') {
      const { user } = this.props;
      const request = { user, fbData: response };
      authorizeFb(request);
      return;
    }
    window.FB.logout();
  }

  onResponseFailure = (status) => {
    if (status === undefined) console.log('feiscat');
  }

  renderRequest() {
    const { user, customButton } = this.props;
    if (!user.hasFbAuth) {
      return (
        <FacebookLogin
          appId="321334748398061"
          autoLoad={false}
          render={renderProps => (
            <Button
              style={{ fontWeight: 'bold', color: 'rgb(0, 120, 215)' }}
              onClick={renderProps.onClick}
            >
              {customButton} <span>Sincronizar</span>
            </Button>
          )}
          fields="name,email,picture"
          callback={this.onResponseSuccess}
          onFailure={this.onResponseFailure}
          cssClass="facebook-button"
        />
      );
    }
    return null;
  }

  render() {
    return this.renderRequest();
  }
}

SocialAuthenticator.propTypes = {
  authorizeFb: PropTypes.func.isRequired,
  customButton: PropTypes.node,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});


const mapDispatchToProps = dispatch => ({
  authorizeFb: (request) => { dispatch(loginFb(request)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SocialAuthenticator);
