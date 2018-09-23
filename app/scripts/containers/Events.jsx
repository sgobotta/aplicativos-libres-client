/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
/** Redux Imports */
import { connect } from 'react-redux';
/** Material UI Imports */
import {
  createMuiTheme, withStyles, MuiThemeProvider,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import deepPurple from '@material-ui/core/colors/deepPurple';
import EventNote from '@material-ui/icons/EventNote';
import Add from '@material-ui/icons/Add';
import SwipeableViews from 'react-swipeable-views';
/** App Imports */
import CreateEvent from 'components/events/Create';
import ViewEvents from 'components/events/View';


const appBarTheme = createMuiTheme({
  overrides: {
    MuiCardContent: {
      root: {
        backgroundColor: 'transparent',
        border: '0px',
        padding: '0px',
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

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
    padding: theme.spacing.unit * 0,
    display: 'flex',
    justifyContent: 'center',
  },
  body: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
});


class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  /**
   * State Methods
   **/

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

  /**
   * Render Methods
   **/

  renderEvents() {
    return (
      <ViewEvents />
    );
  }

  renderCreateEvent() {
    return (
      <CreateEvent user={this.props.user} />
    );
  }

  renderTabs() {
    const { index } = this.state;

    return (
      <MuiThemeProvider key="Orders" theme={appBarTheme}>
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
            <Tab label="Eventos" icon={<EventNote />} />
            <Tab label="Nuevo Evento" icon={<Add />} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={index}
          onChangeIndex={this.handleChangeIndex}
        >
          { this.renderEvents() }
          { this.renderCreateEvent() }
        </SwipeableViews>
      </MuiThemeProvider>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.body} style={{ backgroundColor: 'transparent', boxShadow: '0px' }}>
        <Grid container>
          <Grid item xs={12} style={{ padding: '0px' }} >
            { this.renderTabs() }
          </Grid>
        </Grid>
      </div>
    );
  }
}

Events.propTypes = {
  classes: PropTypes.object.isRequired,
  ui: PropTypes.object,
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return { ui: state.ui, user: state.user };
}

export default connect(mapStateToProps)(withStyles(styles)(Events));
