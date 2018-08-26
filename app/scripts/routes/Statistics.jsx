/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';

/** Ui Material Imports */
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = createMuiTheme({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'rgb(205, 205, 231)',
    borderRadius: '7px',
    padding: '16px',
    marginTop: '16px',
    marginLeft: '16px',
    marginRight: '16px',
  },
  gridList: {
    width: '40%',
    '@media (max-width: 695.95px)': {
      width: '100%',
    },
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});


const customStyles = {
  listTile: {
    width: '100%',
    '&:hover': {
      backgroundColor: 'black',
    },
  },
  img: {
    borderRadius: '16px',
  },
  tileBar: {
    borderRadius: '10px',
  },
};

const tileData = [
  {
    title: 'Gráfico de Votos por Provincia',
    img: require('assets/media/images/statistics/aborto_legal.png'),
    featured: true,
    path: '/map',
  },
];

class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goToRoute = (path) => {
    const { history } = this.props;
    history.push(path);
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={styles} >
        <div className={classes.root}>
          <GridList cellHeight={180} className={classes.gridList}>
            {tileData.map(tile => (
              <GridListTile
                key={tile.img}
                style={customStyles.listTile}
                onClick={() => { this.goToRoute('/map'); }}
              >
                <img
                  src={tile.img}
                  alt={tile.title}
                  style={customStyles.img}
                />
                <GridListTileBar
                  title={tile.title}
                  actionIcon={
                    <IconButton
                      className={classes.icon}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                  style={customStyles.tileBar}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </MuiThemeProvider>
    );
  }
}

Statistics.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(Statistics);
