import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { login, logOut } from 'actions';
// import { login } from "actions";

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
                  <span>map</span><i className="i-map" />
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

                  <a
                    href="#login"
                    className={cx('btn btn-md btn-primary btn-icon app__logout', {
                      'btn-loading': user.status === 'running',
                    })}
                    onClick={this.handleClickLogin}
                  >
                    <span>login</span><i className="i-sign-in" />
                  </a>
                }
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}
