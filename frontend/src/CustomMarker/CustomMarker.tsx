import React from "react";
import { Marker } from 'react-map-gl';
import RoomIcon from '@material-ui/icons/Room';
import 'mapbox-gl/dist/mapbox-gl.css';

interface IMarkerProps {
  murals: any;
  setInfo: (mural: any) => void;
}

function CustomMarker({ murals, setInfo }: IMarkerProps) {
  const size = 40;
  console.log(murals)
  return (murals.map((mural: any) => (
    <Marker
      key={mural.name}
      longitude={mural.coordinates.coordinates ? mural.coordinates.coordinates[0] : 0}
      latitude={mural.coordinates.coordinates ? mural.coordinates.coordinates[1] : 0}
      offsetTop={-size+5}
      offsetLeft={-size/2+2}
    >
      <RoomIcon
        color="error"
        fontSize="large"
        onClick={() => setInfo(mural)
        }
      />
    </Marker >
  ))
  );
}

export default React.memo(CustomMarker);
