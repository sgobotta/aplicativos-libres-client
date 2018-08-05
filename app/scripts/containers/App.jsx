import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Helmet from 'react-helmet';
import cx from 'classnames';
import history from 'modules/history';
import RoutePublic from 'modules/RoutePublic';
import RoutePrivate from 'modules/RoutePrivate';

import LoadingBar from 'react-redux-loading-bar';

import config from 'config';
import { showAlert } from 'actions';

import Home from 'routes/Home';
import Private from 'routes/Private';
import NotFound from 'routes/NotFound';
import Login from 'routes/Login';
import CustomMap from 'routes/CustomMap';
import Settings from 'routes/Settings';
import Orders from 'routes/Orders';

import Header from 'components/Header';
import Footer from 'components/Footer';
import SystemAlerts from 'components/SystemAlerts';
import Drawer from 'components/Drawer';


export class App extends React.Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { dispatch, user } = this.props;
    const { user: nextUser } = nextProps;

    /* istanbul ignore else */
    if (!user.isAuthenticated && nextUser.isAuthenticated) {
      dispatch(showAlert('¡Bienvenide!', { type: 'success', icon: 'i-bell' }));
    }
    if (user.isAuthenticated && !nextUser.isAuthenticated) {
      dispatch(showAlert('¡Hasta luego!', { type: 'success', icon: 'i-bell' }));
    }
  }

  render() {
    const { app, dispatch, user, ui } = this.props;
    return (
      <ConnectedRouter history={history}>
        <div
          className={cx('app', {
            'app--private': user.isAuthenticated,
          })}
        >
          <Helmet
            defer={false}
            htmlAttributes={{ lang: 'pt-br' }}
            encodeSpecialCharacters={true}
            defaultTitle={config.title}
            titleTemplate={`%s | ${config.name}`}
            titleAttributes={{ itemprop: 'name', lang: 'pt-br' }}
          />
          <Drawer drawer={ui.drawer} dispatch={dispatch} history={history} />
          <Header dispatch={dispatch} user={user} />
          <LoadingBar
            style={{ zIndex: 1000, backgroundColor: '#384d30' }}
            updateTime={50} maxProgress={95} progressIncrease={1}
            showFastActions
          />
          <main className="app__main">
            <Switch>
              <RoutePublic
                isAuthenticated={user.isAuthenticated} path="/" exact
                component={Home}
              />
              <RoutePublic
                isAuthenticated={user.isAuthenticated} path="/login"
                component={Login} to="/private"
              />
              <RoutePrivate
                isAuthenticated={user.isAuthenticated} path="/private"
                component={Private} store={app}
                dispatch={dispatch}
              />
              <RoutePrivate
                isAuthenticated={user.isAuthenticated} path="/settings"
                component={Settings} store={app}
                dispatch={dispatch}
              />
              <RoutePrivate
                isAuthenticated={user.isAuthenticated} path="/orders"
                component={Orders} store={app}
                dispatch={dispatch}
              />
              <Route path="/map" component={CustomMap} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
          <SystemAlerts alerts={app.alerts} dispatch={dispatch} />
        </div>
      </ConnectedRouter>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    app: state.app,
    ui: state.ui,
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
