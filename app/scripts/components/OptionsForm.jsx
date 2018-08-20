import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
  size: {
    width: 40,
    height: 40,
  },
  sizeIcon: {
    fontSize: 20,
  },
};

class CheckboxLabels extends React.Component {
  state = {
    checkedG: true,
    checkedOptions: [],
  };

  handleChange = (event) => {
    if (event.target.checked) {
      this.setState({
        checkedOptions: [...this.state.checkedOptions, event.target.value],
      });
    }
    else {
      const newList = this.state.checkedOptions
        .filter((name) => name !== event.target.value);
      this.setState({
        checkedOptions: newList,
      });
    }
  };

  handleCheck = (event) => {
    this.handleChange(event);
    this.props.handleCheck(event);
  }

  shouldDisable = (optionName) => {
    const { checkedOptions } = this.state;
    if (checkedOptions.length === 2 && checkedOptions.indexOf(optionName) < 0) {
      return true;
    }
    return false;
  }

  render() {
    const { classes, options } = this.props;
    const output = options.map((option, index) => (
      <FormControlLabel
        key={index}
        control={
          <Checkbox
            checked={this.state[`checkbox${option.name}`]}
            onChange={this.handleCheck}
            value={option.name}
            disabled={this.shouldDisable(option.name)}
            classes={{
              root: classes.root,
              checked: classes.checked,
            }}
          />
        }
        label={option.name}
      />
    ));
    return (
      <FormGroup row>
        {output}
      </FormGroup>
    );
  }
}

CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired,
  handleCheck: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default withStyles(styles)(CheckboxLabels);
