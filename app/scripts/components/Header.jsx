import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { login, logOut } from 'actions';

import { Link } from 'react-router-dom';


export default class Header extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  handleClickLogout = e => {
    e.preventDefault();

    this.props.dispatch(logOut());
  };

  handleClickLogin = (e) => {
    e.preventDefault();

    this.props.dispatch(login());
  };

  render() {
    const { user } = this.props;
    return (
      <header className="app__header">
        <div className="app__container">
          <div className="app__header__menu">
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/map"
                  className="btn btn-md btn-primary btn-icon"
                >
                  <i className="i-map" /><span>map</span>
                </Link>
              </li>
              <li>
                { user.isAuthenticated &&
                  <a
                    href="#logout"
                    className="btn btn-md btn-primary btn-icon app__logout"
                    onClick={this.handleClickLogout}
                  >
                    <span>logout</span><i className="i-sign-out" />
                  </a>
                }
                { !user.isAuthenticated &&
                  <Link
                    to="/login"
                    className={cx('btn btn-md btn-primary btn-icon app__logout', {
                      'btn-loading': user.status === 'running',
                    })}
                  >
                    <span>login</span><i className="i-sign-in" />
                  </Link>
                }
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}
