/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
/** Redux Imports */
import { connect } from 'react-redux';
import { createOrder } from 'actions';
/** Material UI Imports */
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
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
import Divider from '@material-ui/core/Divider';


const cardTheme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        padding: '0px',
        backgroundColor: 'rgb(205, 205, 231)',
        borderBottomLeftRadius: '3px',
        borderBottomRightRadius: '3px',
        maxWidth: '100%',
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: '0px',
      },
    },
  },
});

const styles = {
  formControl: {
    minWidth: 300,
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
      kind: '',
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
          kind: this.state.kind,
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
            value={this.state.kind}
            onChange={this.handleSelect}
            inputProps={{
              name: 'kind',
              id: 'orderKind',
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
          <Card>
            <CardContent>
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
                    label="Un título decente par favar"
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
            <Divider />
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
      <MuiThemeProvider theme={cardTheme}>
        <Grid
          container
          direction="row"
        >
          { this.renderLeftGrid() }
        </Grid>
      </MuiThemeProvider>
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
