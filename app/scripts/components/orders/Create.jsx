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
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: (ITEM_HEIGHT * 4.5) + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  'Nicolo'
];

const styles = {
  formControl: {
    minWidth: 120,
    maxWidth: 300,
  },
  card: {
    minWidth: '100%',
    borderRadius: '3px',
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
    };
  }

  handleCreate = () => {
    const { dispatch } = this.props;
    dispatch(
      createOrder(
        { author: this.props.user.data.id, title: this.state.title, dispatch }
      )
    );
  }

  handleSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  renderForm() {
    return (
      <Grid item xs={12}>
        <InputLabel htmlFor="orderType">Tipo de Pedido</InputLabel>
        <Select
          value={this.state.type}
          onChange={this.handleSelect}
          inputProps={{
              name: 'type',
              id: 'orderType'
          }}
          style={ {width: '100%'}}
        >
          <MenuItem value={10}>Nicolo</MenuItem>
        </Select>
      </Grid>
    );
  }

  renderLeftGrid() {
    const { classes } = this.props;
    return(
      <Grid item xs={12} md={6}>
        <Grid container direction="column">
          <Card className={classes.card}>
            <CardContent>
              <Grid item xs={12}>
                <Typography variant="title">
                  Crear Pedido
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  label="Usuario"
                  className={classes.textField}
                  type="text"
                  margin="normal"
                  value={this.state.username}
                  InputProps={{ readOnly: true }}
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  label="Título"
                  className={classes.textField}
                  type="text"
                  margin="normal"
                  onChange={this.handleChange('title')}
                  value={this.state.title}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl} margin="normal">
                  {this.renderForm()}
                </FormControl>
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
        { this.renderRightGrid() }
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
