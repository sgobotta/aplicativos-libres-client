/** React Imports */
import React from 'react';
import PropTypes from 'prop-types';
/** Redux Imports */
import { connect } from 'react-redux';
/** Material UI Imports */
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
/** App Imports */
import GeolocationContainer from 'containers/Geolocation';

const styles = {
  card: {
    minWidth: '70%',
    minHeigth: '100%',
    borderRadius: '3px',
    margin: '10px 10px 10px 10px',
    // marginLeft: '10px',
    // marginRight: '10px',
  },
  cardContent: {
    fontSize: '16px',
  },
  cardFooter: {
    textAlign: 'right',
    fontSize: '16px',
  },
};

export class Home extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div key="Home" className="">
        <GeolocationContainer />
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardHeader title="Sentimientos aleatorios..." />
            <CardContent className={classes.cardContent}>
              Esas crueldades no lo son en realidad. Un hombre de la Edad Media execraría todo el estilo de nuestra vida actual no ya como cruel, sino como atroz y bárbaro. Cada época, cada cultura, cada costumbre y tradición tiene su estilo, tienen sus ternuras y durezas peculiares, sus crueldades y bellezas; consideran ciertos surimientos como naturales; aceptan ciertos males con paciencia. La vida humana se convierte en verdadero dolor, en verdadero infierno sólo allí donde dos épocas, dos culturas o religiones se entrecruzan. Un hombre de la antigüedad que hubiese tenido que vivir en la Edad Media se habría asfixiado tristemente, lo mismo que un salvaje tendría que asfixiarse en medio de nuestra civilización. Hay momentos en los que toda una generación se encuentra extraviada entre dos épocas, entre dos estilos de vida, de tal suerte, que tiene que perder toda naturalidad, toda norma, toda seguridad e inocencia. Es claro que no todos perciben esto con la misma intensidad. Una naturaleza como Nietzsche hubo de sufrir la miseria actual con más de una generación por anticipado; lo que él, solitario e incomprendido, hubo de gustar hasta la saciedad, lo están soportando hoy millares de seres.
            </CardContent>
            <CardContent className={classes.cardFooter}>
              Haller
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(withStyles(styles)(Home));
