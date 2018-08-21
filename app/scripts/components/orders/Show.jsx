/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
/** Redux Imports */
import { connect } from 'react-redux';
/** Material UI Imports */
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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

const styles = {
  formControl: {
    minWidth: 120,
    maxWidth: 300,
  },
};


const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];


class OrderShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderForm() {
    const { classes } = this.props;
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>
        <Select
          multiple
          value={this.state.name}
          onChange={this.handleChange}
          input={<Input id="select-multiple-checkbox" />}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map(name => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={this.state.name.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  render() {
    const { classes, order } = this.props;
    if (order) {
      return (
        <Grid>
          <Card className={classes.mainCard}>
            <CardContent>
              <Typography variant="title" align="center">{order.title}</Typography>
              {this.renderForm()}
            </CardContent>
          </Card>
        </Grid>
      );
    }
    return null;
  }
}

OrderShow.propTypes = {
  classes: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return { ui: state.ui, user: state.user };
}
export default connect(mapStateToProps)(withStyles(styles)(OrderShow));
