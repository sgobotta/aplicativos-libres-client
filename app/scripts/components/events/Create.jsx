/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
/** Redux Imports */
import { connect } from 'react-redux';
// import { createOrder } from 'actions';
/** App Imports */
import { DateUtils } from 'utils/dates';
import GeolocationContainer from 'containers/Geolocation';
/** Material UI Imports */
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
/** Material UI Icons */
import SaveIcon from '@material-ui/icons/Save';
import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate';


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
    color: 'rgb(0, 120, 215)',
  },
  container: {
    display: 'inline-grid',
    flexDirection: 'column',
    '@media (max-width: 415px)': {
      display: 'flex',
    },
  },
  fileButton: {
    marginTop: '30px',
    color: 'black',
    border: '2px solid rgb(0, 120, 215)',
  },
  fileInput: {
    display: 'none',
  },
  addPhotoIcon: {
    marginLeft: '12px',
    color: 'rgb(0, 120, 215)',
  },
};


class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordsLoaded: false,
      username: props.user.data.username,
      title: '',
      date: '',
      fileName: '',
      file: null,
      description: '',
      latitude: '',
      longitude: '',
      address: '',
    };
  }

  /**
   * Form Methods
   **/

  handleChange = () => event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFileChange = () => event => {
    const file = event.target.files[0];
    this.setState({
      fileName: file.name,
      file,
    });
  }

  onSearchSubmit = (result) => {
    console.log(result);
    if (result) {
      const { latitude, longitude, address } = result;
      this.setState({
        latitude,
        longitude,
        address,
        coordsLoaded: true,
      });
    }
  }

  handleCreate = () => {
    console.log('Created');
    // const { dispatch } = this.props;
    // dispatch(
    //   createOrder(
    //     {
    //       author: this.props.user.data.id,
    //       title: this.state.title,
    //       kind: this.state.kind,
    //       dispatch,
    //     }
    //   )
    // );
  }

  /**
   * Render Methods
   **/

  renderCoordinatesFeedback() {
    const { coordsLoaded, latitude, longitude, address } = this.state;
    if (coordsLoaded) {
      return (
        <div style={{ width: '100%' }}>
          <TextField
            label="Latitud"
            type="text"
            margin="normal"
            value={latitude}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Longitud"
            type="text"
            margin="normal"
            value={longitude}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Dirección"
            type="text"
            margin="normal"
            value={address}
            InputProps={{ readOnly: true }}
          />
        </div>
      );
    }
    return null;
  }

  renderForm() {
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
                    type="text"
                    margin="normal"
                    value={this.state.username}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    name="title"
                    label="Un título decente par favar"
                    type="text"
                    margin="normal"
                    onChange={this.handleChange()}
                    value={this.state.title}
                    style={{ marginBottom: '20px' }}
                  />
                  <TextField
                    name="date"
                    label="Fecha"
                    type="datetime-local"
                    defaultValue={DateUtils.getTodayDatetime()}
                    onChange={this.handleChange()}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Button
                    raised="true"
                    component="label"
                    style={styles.fileButton}
                  >
                    Subir Imagen de Portada
                    <AddPhotoAlternate style={styles.addPhotoIcon} />
                    <input
                      style={styles.fileInput}
                      type="file"
                      onChange={this.handleFileChange()}
                    />
                  </Button>
                  { this.state.fileName &&
                    <TextField
                      label="Imagen de Portada"
                      type="text"
                      margin="normal"
                      value={this.state.fileName}
                      InputProps={{ readOnly: true }}
                    />
                  }
                  <TextField
                    name="description"
                    label="Descripción sin emojis chetos"
                    multiline
                    rowsMax="20"
                    value={this.state.multiline}
                    onChange={this.handleChange()}
                    margin="normal"
                    helperText=""
                    variant="outlined"
                    fullWidth={true}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} style={{ height: '520px' }}>
                { this.renderCoordinatesFeedback() }
                <GeolocationContainer
                  onSearchSubmit={this.onSearchSubmit}
                />
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                size="small"
                onClick={this.handleCreate}
              >
                <Typography variant="button" style={styles.button}>
                  <SaveIcon /> Confirmar
                </Typography>
              </Button>
            </CardActions>
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
          { this.renderForm() }
        </Grid>
      </MuiThemeProvider>
    );
  }
}

CreateEvent.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return { dispatch: state.dispatch, ui: state.ui };
}

export default connect(mapStateToProps)(withStyles(styles)(CreateEvent));
