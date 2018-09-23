import { withLeaflet, MapControl } from 'react-leaflet';
import { GeoSearchControl, EsriProvider } from 'leaflet-geosearch';
import L from 'leaflet';


class SearchControl extends MapControl {
  createLeafletElement() {
    return GeoSearchControl({
      provider: new EsriProvider(),
      style: 'bar',
      showMarker: true,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: true,
      animateZoom: true,
      keepResult: true,
      searchLabel: 'Buscar por dirección',
      marker: {
        icon: new L.Icon.Default(),
        draggable: false,
      },
    });
  }
}

export default withLeaflet(SearchControl);
