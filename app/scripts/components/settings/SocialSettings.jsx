/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
/** Redux Imports */
import { connect } from 'react-redux';
/** Material UI Imports */
import { createMuiTheme, withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
/** Material Ui Icons */
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import EventIcon from '@material-ui/icons/Event';
/** Custom Imports */
import ExpansionPanel from 'components/custom/ExpansionPanel';
import { DateUtils } from 'utils/dates';
import SocialAuth from 'components/authentication/SocialAuth';
import { importEvents, logoutFb } from 'actions';


const expansionPanelTheme = createMuiTheme({
  overrides: {
    MuiCardContent: {
      root: {
        padding: '0px',
        background: 'transparent',
      },
    },
    MuiExpansionPanel: {
      root: {
        backgroundColor: 'rgb(205, 205, 231)',
        borderRadius: '0px',
      },
      expanded: {
        backgroundColor: 'rgb(180, 205, 231)',
      },
    },
  },
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 680,
    padding: theme.spacing.unit * 2,
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    background: 'rgb(205, 205, 231)',
  },
  gridSection: {
    marginBottom: '10px',
    marginTop: '10px',
  },
  body: {
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    minWidth: '100%',
    background: 'rgb(180, 205, 231)',
  },
  button: {
    fontWeight: 'bold',
    color: 'rgb(0, 120, 215)',
  },
  events: {
    root: {
      marginTop: '45px',
      marginBottom: '45px',
    },
    date: {
      marginTop: '10px',
      fontWeight: 'bold',
    },
    title: {
      marginBottom: '10px',
      fontWeight: 'bold',
    },
    description: {
      fontStyle: 'italic',
      width: '100%',
      height: '100%',
    },
    address: {
      fontWeight: 'bold',
      color: 'rgb(0, 120, 215)',
    },
  },
  expansionPanel: {
    padding: '5px 5px 5px 5px',
    borderRadius: '0px',
    '&:hover': {
      backgroundColor: 'rgb(180, 205, 231)',
      marginBottom: '12px',
      borderBottomLeftRadius: '7px',
    },
    borderTopLeftRadius: '0px !important',
    borderTopRightRadius: '0px !important',
    borderBottomRightRadius: '0px !important',
  },
  expansionPanelSummary: {
    padding: '0 4px 0 4px',
  },
  expansionPanelDetails: {
    alignItems: 'center',
    padding: '0 4px 0 4px',
  },
  expansionPanelActions: {
    padding: '5px 5px 5px 10px',
  },
});


class SocialSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  
  handlePanelToggling = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };
  
  handleStopSocialSync = () => {
    const { finishSocialSync, user } = this.props;
    finishSocialSync({ id: user.data.id });
  }

  handleImportEvents = () => {
    const { handleImportEvents, user } = this.props;
    handleImportEvents({
      id: user.fbData.id,
      accessToken: user.fbData.accessToken,
    });
  }

  renderForm() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid item xs={12} sm container>
          <Card className={classes.card}>
            <CardContent>
              <Grid item xs={12}>
                <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                  <CheckCircleOutlinedIcon style={{ color: 'green' }} /> Sincronización con Facebook
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="button" align="center" className={classes.button}>
                  <Button
                    className={classes.button} size="small"
                    onClick={this.handleStopSocialSync}
                  >
                    <span>Terminar Sincronización con Facebook</span>
                  </Button>
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </React.Fragment>
    );
  }

  renderVisitorForm() {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="body2" style={{ fontWeight: 'bold' }}>
              <HighlightOffIcon style={{ color: 'red' }} /> Sincronización con Facebook
            </Typography>
          </CardContent>
          <CardActions align="center">
            <Typography variant="button" align="center" className={classes.button}>
              <SocialAuth />
            </Typography>
          </CardActions>
        </Card>
      </Grid>
    );
  }

  renderContent() {
    const { user } = this.props;
    if (user.hasFbAuth && user.fbData) {
      return this.renderForm();
    }
    return this.renderVisitorForm();
  }

  renderDate(date) {
    return DateUtils.getParsedDate(date);
  }

  renderExpansionPanelSummary(event) {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <Typography align="left" variant="subheading" className={classes.events.date}>
            {this.renderDate(event.start_time)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center" variant="headline" className={classes.events.title}>
            {event.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="right" variant="button" className={classes.events.address}>
            Lugar | {event.place.name}
          </Typography>
        </Grid>
      </React.Fragment>
    );
  }

  renderExpansionPanelDetails(event) {
    const { classes } = this.props;
    return (
      <Grid item xs={12} className={classes.events.description}>
        <TextField
          fullWidth
          align="right"
          InputLabelProps={{ shrink: true }}
          multiline
          variant="outlined"
          margin="normal"
          value={event.description}
        >
          {}
        </TextField>
      </Grid>
    )
  }
  
  renderExpansionPanelActions(event) {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Divider />
        <CardActions>
          {}
        </CardActions>
      </React.Fragment>
    );
  }

  renderEvent(event, index) {
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
      <div key={index}>
        <Grid container direction="column" className={classes.events.root}>
          <MuiThemeProvider theme={expansionPanelTheme}>
            <ExpansionPanel
              actionsClassName={classes.expansionPanelActions}
              actionsContent={this.renderExpansionPanelActions(event)}
              detailsClassName={classes.expansionPanelDetails}
              detailsContent={this.renderExpansionPanelDetails(event)}
              expanded={expanded === `panel${index}`}
              onChange={this.handlePanelToggling(`panel${index}`)}
              panelClassName={
                classNames(
                  classes.expansionPanel
                )
              }
              summaryClassName={classNames(classes.expansionPanelSummary)}
              summaryContent={this.renderExpansionPanelSummary(event)}
              />
          </MuiThemeProvider>
          </Grid>
      </div>
    );
  }

  renderEvents() {
    const { fbEvents } = this.props;
    if (fbEvents && fbEvents.eventsData && fbEvents.eventsData.data && fbEvents.eventsData.data.length > 0) {
      const events = fbEvents.eventsData.data.map((event, index) => this.renderEvent(event, index));
      return events;
    }
    return null;
  }

  renderEventsConfiguration() {
    const { user, classes } = this.props;
    if (user.hasFbAuth) {
      return (
        <Grid item xs={12} className={classes.gridSection}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                <EventIcon style={{ color: 'red' }} /> Eventos
              </Typography>
            </CardContent>
            <CardActions align="center">
              <Button
                style={{ fontWeight: 'bold', color: 'rgb(0, 120, 215)' }}
                onClick={this.handleImportEvents}
              >
                Ver Eventos de Facebook
              </Button>
            </CardActions>
            <CardContent>
              { this.renderEvents() }
            </CardContent>
          </Card>
        </Grid>
      );
    }
    return null;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.body}>
        <Paper className={classes.root}>
          <Grid container>
            { this.renderContent() }
            { this.renderEventsConfiguration() }
          </Grid>
        </Paper>
      </div>
    );
  }
}

SocialSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  fbEvents: PropTypes.object.isRequired,
  finishSocialSync: PropTypes.func.isRequired,
  handleImportEvents: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    fbEvents: state.fbEvents,
    user: state.user,
  };
}

const mapDispatchToProps = dispatch => ({
  finishSocialSync: (request) => { dispatch(logoutFb(request)); },
  handleImportEvents: (request) => { dispatch(importEvents(request)); }
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SocialSettings));
