import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { connect } from 'react-redux';
import { login } from 'actions';

const styles = {
  body: {
    marginTop: '100px',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    minWidth: 275,
    maxWidth: 600,
    borderRadius: '20px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    fontWeight: 'bold',
  },
  pos: {
    marginBottom: 12,
  },
  cardAction: {
    width: '100%',
  },
};

class SimpleCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }
  handleClickLogin = () => {
    this.props.dispatch(login(this.state));
  };

  handleFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.body}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              Login
            </Typography>
            <form className={classes.container}>
              <TextField
                required
                name="email"
                type="email"
                label="Email"
                className={classes.textField}
                margin="normal"
                value={this.state.email}
                onChange={this.handleFieldChange}
              />
              <TextField
                name="password"
                label="Password"
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
              <Typography variant="button" style={styles.button}>
                Login
              </Typography>
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(withStyles(styles)(SimpleCard));
