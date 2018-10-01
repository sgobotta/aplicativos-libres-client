/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
/** Redux Imports */
import { connect } from 'react-redux';
/** Material UI Imports */
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
/** Material Ui Icons */
import CachedIcon from '@material-ui/icons/Cached';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
/** Custom Imports */
import SocialAuth from 'components/authentication/SocialAuth'
import { logoutFb } from 'actions';


const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 680,
    padding: theme.spacing.unit * 2,
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    background: 'rgb(205, 205, 231)',
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
});


class SocialSettings extends React.Component {
  handleStopSocialSync = () => {
    const { finishSocialSync, user } = this.props;
    finishSocialSync({ id: user.data.id });
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
                  <CheckCircleOutlinedIcon style={{ color: 'green' }} /> Sincronización
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="button" align="center" className={classes.button}>
                  <Button
                    className={classes.button} size="small"
                    onClick={this.handleStopSocialSync}
                  >
                    <CachedIcon style={{ textAlign: 'center' }} /> <span>Terminar Sincronización</span>
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
      <Grid item xs={12} sm container>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="body2" style={{ fontWeight: 'bold' }}>
              <HighlightOffIcon style={{ color: 'red' }} /> Sincronización
            </Typography>
          </CardContent>
          <CardActions align="center">
            <Typography variant="button" align="center" className={classes.button}>
              <SocialAuth
                customButton={
                  <CachedIcon style={{ textAlign: 'center' }} />
                }
              />
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

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.body}>
        <Paper className={classes.root}>
          <Grid container>
            { this.renderContent() }
          </Grid>
        </Paper>
      </div>
    );
  }
}

SocialSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  finishSocialSync: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return { user: state.user };
}

const mapDispatchToProps = dispatch => ({
  finishSocialSync: (request) => { dispatch(logoutFb(request)); },
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SocialSettings));
