import React from "react";
import { Marker } from "react-map-gl";
import RoomIcon from "@material-ui/icons/Room";
import "mapbox-gl/dist/mapbox-gl.css";

interface IMarkerProps {
  murals: any;
  setInfo: (mural: any) => void;
}

function CustomMarker({ murals, setInfo }: IMarkerProps) {
  //const { murals, onClick } = props;
  const size = 40;

  return murals.map((mural: any) => (
    <Marker
      key={mural.name}
      longitude={mural.coordinates.coordinates[0]}
      latitude={mural.coordinates.coordinates[1]}
    >
      <RoomIcon
        style={{ transform: `translate(${-size / 2}px,${-size}px)` }}
        color="primary"
        fontSize="large"
        onClick={() => setInfo(mural)}
      />
    </Marker>
  ));
}

export default React.memo(CustomMarker);
