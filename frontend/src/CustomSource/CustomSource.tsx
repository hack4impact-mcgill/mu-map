import React from "react";
import { Source, Layer } from "react-map-gl";
import { PRIMARY } from "constants/constants";
import "mapbox-gl/dist/mapbox-gl.css";

interface ISourceProps {
  tours: any;
  currentTour: any; 
}

function CustomSource({ tours, currentTour }: ISourceProps) {
  const getCoordinates = (tour: any) => {
    return Array.from(
      tour.murals,
      (mural: any) => mural.coordinates.coordinates
    );
  };
  const getTourCoordinates = (currentTour: any) => {
    return Array.from(
      currentTour[1].steps,
      (tour: any) => tour.maneuver.location
    )
  }

  const geojson = (tour: any) => {
    return {
      type: "FeatureCollection" as "FeatureCollection",
      features: [
        {
          type: "Feature" as "Feature",
          properties: {},
          geometry: {
            type: "LineString" as "LineString",
            coordinates: getCoordinates(tour)
          },
        },
      ],
    };
  };
  const tourGeojson = (tour: any) => {
    return {
      type: "FeatureCollection" as "FeatureCollection",
      features: [
        {
          type: "Feature" as "Feature",
          properties: {},
          geometry: {
            type: "LineString" as "LineString",
            coordinates: getTourCoordinates(tour)
          },
        },
      ],
    };
  }
  
  if (currentTour.length > 0) {
    return currentTour.map((tour: any) => (
      <Source type="geojson" data={tourGeojson(tour)}>
        <Layer
          id="1"
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
    ));
  }
  return tours.map((tour: any) => (
    <Source type="geojson" data={geojson(tour)}>
      <Layer
        id={String(tour.id)}
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
  ));
}

export default React.memo(CustomSource);
