import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import {
    DEFAULT_LONGITUDE,
    DEFAULT_LATITUDE,
    DEFAULT_ZOOM,
} from "constants/constants";
import "./Map.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";

interface IMapProps {
    mapContainer: HTMLElement | string | null;
    murals: any;
}

function Map({ mapContainer, murals }: IMapProps) {
    const [lng, setLng] = useState(DEFAULT_LONGITUDE);
    const [lat, setLat] = useState(DEFAULT_LATITUDE);
    const [zoom, setZoom] = useState(DEFAULT_ZOOM);


    useEffect(() => {
        const map = new mapboxgl.Map({
            container: (mapContainer as any),
            style: "mapbox://styles/mapbox/streets-v11",
            center: [lng, lat],
            zoom: zoom,
        });

        map.on("move", () => {
            setLng(map.getCenter().lng);
            setLat(map.getCenter().lat);
            setZoom(map.getZoom());
        });

        murals.forEach((mural: any) => {

            new mapboxgl.Marker({ color: "red" })
                .setLngLat([
                    mural.coordinates.coordinates[0],
                    mural.coordinates.coordinates[1],
                ])
                .setPopup(new mapboxgl.Popup({ offset: 25, closeButton: false, className: 'popup' })
                    .setHTML(' <img style= "max-width:200px;max-height:200px; padding:none" src=" ' + mural.ImgURLs + ' "  alt="Mural_img" ></img> <p> <h3> '
                        + mural.name + ' </h3> ' + mural.address
                        + ' </p> <Button class="btn" style="background-color:white; border: none; color:#3B71AE;font-size:14px; outline:none;"> EDIT </Button>'))
                .addTo(map);

            const btn = document.getElementsByClassName("btn")[0];
            if (btn) {
                btn.addEventListener("click", () => {
                    // need to communicate that this mural is chosen to be edited
                    console.log("HEY"); // doesn't work
                });
            }
        });

        // murals.forEach((mural: any) => {

        //     const marker = new mapboxgl.Marker()
        //         .setLngLat([
        //             mural.coordinates.coordinates[0],
        //             mural.coordinates.coordinates[1],
        //         ])
        //         .addTo(map);
        //     const markerDiv = marker.getElement()
        //     const popup = new mapboxgl.Popup({ offset: 25, closeButton: false, closeOnClick: false, className: 'popup' })
        //         .setHTML(' <img src=" ' + mural.ImgURLs + ' " alt="Mural_img" ></img> <h3> ' + mural.name + ' </h3> <p> ' + mural.address + '</p> <Button color="primary" size="small" className={styles.bottomButton}> EDIT </Button>')

        //     markerDiv.addEventListener('mouseenter', () => popup.addTo(map));
        //     markerDiv.addEventListener('mouseleave', () => popup.remove());
        //     marker.setPopup(popup);
        //     marker.addTo(map);
        // });


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [murals]);

    return (
        <div>
            <div ref={(el) => (mapContainer = el)} className="mapContainer" />
        </div>
    );
}

export default Map;
