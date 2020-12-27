import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { DEFAULT_LONGITUDE, DEFAULT_LATITUDE, DEFAULT_ZOOM } from 'constants/constants';
import './Map.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || '';

interface IMapProps {
    mapContainer: HTMLElement | string | null;
}

function Map(props: IMapProps) {
    const [lng, setLng] = useState(DEFAULT_LONGITUDE);
    const [lat, setLat] = useState(DEFAULT_LATITUDE);
    const [zoom, setZoom] = useState(DEFAULT_ZOOM);

    let mapContainer: any = props.mapContainer;

    useEffect(() => {

        const map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        map.on('move', () => {
            setLng(map.getCenter().lng);
            setLat(map.getCenter().lat);
            setZoom(map.getZoom());
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div ref={el => mapContainer = el} className="mapContainer" >test</div>
        </div>
    );
}

export default Map;
