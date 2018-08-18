/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
/** Redux Imports */
import { connect } from 'react-redux';
import { createOrder } from 'actions';
/** Material UI Imports */
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const styles = {
  formControl: {
    minWidth: 300,
    maxWidth: '100%',
  },
  card: {
    minWidth: '100%',
    borderBottomRadius: '3px',
  },
  menuCard: {

  },
  button: {
    fontWeight: 'bold',
  },
  container: {
    display: 'inline-grid',
    flexDirection: 'column',
    '@media (max-width: 415px)': {
      display: 'flex',
    },
  },
};

class OrderCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.user.data.username,
      type: '',
      title: '',
    };
  }

  handleCreate = () => {
    const { dispatch } = this.props;
    dispatch(
      createOrder(
        {
          author: this.props.user.data.id,
          title: this.state.title,
          type: this.state.type,
          dispatch,
        }
      )
    );
  }

  handleSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChange = () => event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  renderSelect() {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <FormControl className={classes.formControl} margin="normal">
          <InputLabel htmlFor="orderType">Tipo de Pedido</InputLabel>
          <Select
            value={this.state.type}
            onChange={this.handleSelect}
            inputProps={{
              name: 'type',
              id: 'orderType',
            }}
          >
            <MenuItem value="nicolo">Nicolo</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    );
  }

  renderLeftGrid() {
    const { classes } = this.props;
    return (
      <Grid item xs={12} md={12}>
        <Grid container direction="column">
          <Card className={classes.card}>
            <CardContent>
              <Grid item xs={12}>
                <Typography variant="title">
                  Crear Pedido
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl} margin="normal">
                  <TextField
                    name="username"
                    label="Usuario"
                    className={classes.textField}
                    type="text"
                    margin="normal"
                    value={this.state.username}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    name="title"
                    label="Título"
                    className={classes.textField}
                    type="text"
                    margin="normal"
                    onChange={this.handleChange()}
                    value={this.state.title}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {this.renderSelect()}
              </Grid>
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
      </Grid>
    );
  }

  renderRightGrid() {
    const { classes } = this.props;
    return (
      <Grid item xs={12} md={6}>
        <Grid container direction="column">
          <Card className={classes.menuCard}>
            <CardContent>
              <Typography variant="title">
                Menu!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <Grid container direction="row">
        { this.renderLeftGrid() }
      </Grid>
    );
  }
}

OrderCreate.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return { dispatch: state.dispatch, orders: state.orders, ui: state.ui };
}

export default connect(mapStateToProps)(withStyles(styles)(OrderCreate));
