/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
/** Redux Imports */
import { connect } from 'react-redux';
import { createOrder, showAlert } from 'actions';
/** Material UI Imports */
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';


const styles = {
  card: {
    minWidth: '100%',
    borderRadius: '3px',
  },
  button: {
    fontWeight: 'bold',
  },
};

class OrderCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.user.user.username,
    };
  }

  handleCreate = () => {
    const { dispatch } = this.props;
    dispatch(createOrder());
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="title">
              Crear Pedido
            </Typography>
            <form className={classes.container}>
              <TextField
                name="username"
                label="Usuario"
                className={classes.textField}
                type="text"
                margin="normal"
                value={this.state.username}
                InputProps={{ readOnly: true }}
              />
            </form>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={this.handleCreate}
            >
              <Typography variant="button" style={styles.button}>
                Confirmar
              </Typography>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

OrderCreate.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

// export default withStyles(styles)(OrderCreate);

/* istanbul ignore next */
function mapStateToProps(state) {
  return { dispatch: state.dispatch };
}

export default connect(mapStateToProps)(withStyles(styles)(OrderCreate));
