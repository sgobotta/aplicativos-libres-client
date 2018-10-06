/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
/** Redux Imports */
import { connect } from 'react-redux';
import { patchUser } from 'actions';
/** Material UI Imports */
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
/** Material Ui Icons */
import SaveIcon from '@material-ui/icons/Save';

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


class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    // users.data is available when the service is used, otherwise we use the
    // current authenticated user username.
    const { username } = props.users.data || props.user.data;
    this.state = {
      password: '',
      username,
    };
  }

  handleSave = () => {
    const { password, username } = this.state;
    const { dispatch, user } = this.props;

    dispatch(
      patchUser({
        id: user.data.id,
        password,
        service: 'patchUserInfo',
        username,
        dispatch,
      })
    );
  }

  handleFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  renderForm() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <FormControl className={classes.formControl} margin="normal">
            <TextField
              name="username"
              label="Modificar Usuario"
              className={classes.textField}
              type="text"
              margin="normal"
              value={this.state.username}
              onChange={this.handleFieldChange}
            />
            <TextField
              name="password"
              label="Modificar Contraseña"
              className={classes.textField}
              type="password"
              margin="normal"
              value={this.state.password}
              onChange={this.handleFieldChange}
            />
          </FormControl>
        </CardContent>
        <CardActions>
          <Button
            className={classes.cardAction} size="small"
            onClick={this.handleSave}
          >
            <Typography variant="button" className={classes.button}>
              <SaveIcon /> Confirmar
            </Typography>
          </Button>
        </CardActions>
      </Card>
    );
  }

  renderVisitorForm() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" component="h3">
            No tenés cuenta :(
          </Typography>
          <Typography component="p">
            No hay nada que ver acá...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  renderContent() {
    const { user } = this.props;
    if (user.isAuthenticated) {
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
            <Grid item xs={12} sm container>
              { this.renderContent() }
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

UserSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(withStyles(styles)(UserSettings));
