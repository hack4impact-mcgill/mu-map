import React from "react";
import { Source, Layer } from "react-map-gl";
import { PRIMARY } from "constants/constants";
import "mapbox-gl/dist/mapbox-gl.css";

interface ISourceProps {
  tours: any;
}

function CustomSource({ tours }: ISourceProps) {
  const getCoordinates = (tour: any) => {
    return Array.from(
      tour.murals,
      (mural: any) => mural.coordinates.coordinates
    );
  };

  const geojson = (tour: any) => {
    return {
      type: "FeatureCollection" as "FeatureCollection",
      features: [
        {
          type: "Feature" as "Feature",
          properties: {},
          geometry: {
            type: "LineString" as "LineString",
            coordinates: getCoordinates(tour),
          },
        },
      ],
    };
  };

  return tours
    ? tours.map((tour: any) => (
        <Source type="geojson" data={geojson(tour)}>
          <Layer
            id="tour"
            type="line"
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
            paint={{
              "line-color": PRIMARY,
              "line-width": 5,
            }}
          />
        </Source>
      ))
    : null;
}

export default React.memo(CustomSource);
