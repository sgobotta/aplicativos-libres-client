/** React Imports */
import React from 'react';
/** Redux Imports */
import { connect } from 'react-redux';
/** Material UI Imports */
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import deepPurple from '@material-ui/core/colors/deepPurple';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SwipeableViews from 'react-swipeable-views';
/** Custom Imports */
import UserSettings from './UserSettings';


const appBarTheme = createMuiTheme({
  overrides: {
    MuiCardContent: {
      root: {
        backgroundColor: 'transparent',
        border: '0px',
      },
    },
  },
  palette: {
    primary: {
      light: deepPurple[300],
      main: 'rgb(205, 205, 231)',
      dark: deepPurple[600],
      contrastText: deepPurple[900],
    },
    secondary: {
      main: 'rgb(0, 120, 215)',
    },
  },
});


class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  renderUserSettings() {
    return (
      <UserSettings {...this.props} />
    );
  }

  render() {
    const { index } = this.state;
    return (
      <MuiThemeProvider key="Settings" theme={appBarTheme}>
        <AppBar
          position="static"
          color="primary"
        >
          <Tabs
            value={index}
            onChange={this.handleChange}
            scrollable
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab label="Usuario" icon={<AccountCircle />} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={index}
          onChangeIndex={this.handleChangeIndex}
        >
          { this.renderUserSettings() }
        </SwipeableViews>
      </MuiThemeProvider>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { user: state.user, users: state.users };
}

export default connect(mapStateToProps)(SettingsContainer);
