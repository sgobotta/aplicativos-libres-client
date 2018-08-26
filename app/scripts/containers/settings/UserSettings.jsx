/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
/** Redux Imports */
import { patchUser } from 'actions';
/** Material UI Imports */
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


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
  },
});


class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.body}>
        <Paper className={classes.root}>
          <Grid container spacing={16}>
            <Grid item xs={12} sm container>
              <Grid container>
                <Card className={classes.card}>
                  <CardContent>
                    <form>
                      <TextField
                        name="password"
                        label="Modificar Contraseña"
                        className={classes.textField}
                        type="password"
                        margin="normal"
                        value={this.state.password}
                        onChange={this.handleFieldChange}
                      />
                    </form>
                  </CardContent>
                  <CardActions>
                    <Button
                      className={classes.cardAction} size="small"
                      onClick={this.handleClickLogin}
                    >
                      <Typography variant="button" className={classes.button}>
                        Confirmar
                      </Typography>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

UserSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserSettings);
