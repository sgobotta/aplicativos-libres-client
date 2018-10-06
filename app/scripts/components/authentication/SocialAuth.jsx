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
import Loader from 'components/Loader';


class SocialAuthenticator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSynchronizing: false,
    };
  }

  handleClick = () => {
    this.setState({ isSynchronizing: true });
  }

  onResponseSuccess = (response) => {
    console.log('Facebook Response', response);
    const { authorizeFb } = this.props;
    if (response.status !== 'unknown') {
      const { user } = this.props;
      const request = { user, fbData: response };
      authorizeFb(request);
      this.setState({ isSynchronizing: false });
      return;
    }
    this.setState({ isSynchronizing: false });
    window.FB.logout();
  }

  onResponseFailure = (status) => {
    if (status === undefined) console.log('feiscat response failed');
    this.setState({ isSynchronizing: false });
  }

  renderRequest() {
    const { user } = this.props;
    const { isSynchronizing } = this.state;
    if (!user.hasFbAuth) {
      return (
        <FacebookLogin
          appId="321334748398061"
          autoLoad={false}
          render={renderProps => (
            <React.Fragment>
              { isSynchronizing &&
                <Button
                  style={{ fontWeight: 'bold', color: 'rgb(0, 120, 215)' }}
                  disabled
                >
                  <span>Sincronizando...</span><Loader />
                </Button>
              }
              { !isSynchronizing &&
                <Button
                  style={{ fontWeight: 'bold', color: 'rgb(0, 120, 215)' }}
                  onClick={renderProps.onClick}
                >
                  <span>Sincronizar</span>
                </Button>
              }
            </React.Fragment>
          )}
          onClick={this.handleClick}
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
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});


const mapDispatchToProps = dispatch => ({
  authorizeFb: (request) => { dispatch(loginFb(request)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SocialAuthenticator);
