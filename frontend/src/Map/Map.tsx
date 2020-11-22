import React from 'react';
import mapboxgl from 'mapbox-gl';
import { DEFAULT_LONGITUDE, DEFAULT_LATITUDE, DEFAULT_ZOOM } from 'constants/constants';
import './Map.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || '';

interface IMapProps {
    mapContainer?: HTMLElement | string | null;
}

interface IMapState {
    lng: number;
    lat: number;
    zoom: number;
}
class Map extends React.Component<IMapProps, IMapState> {
    mapContainer: string | HTMLElement;

    constructor(props: IMapProps) {
        super(props);
        this.state = {
            lng: DEFAULT_LONGITUDE,
            lat: DEFAULT_LATITUDE,
            zoom: DEFAULT_ZOOM
        };
        this.mapContainer = '';
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng,
                lat: map.getCenter().lat,
                zoom: map.getZoom()
            });
        });
    }

    render() {
        return (
            <div>
                <div ref={el => this.mapContainer = el ? el : ''} className="mapContainer" />
            </div>
        )
    }
}

export default Map;
