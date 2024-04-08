import React from "react";

import { DataPoint } from "@common/types";
import { Marker as RNMapsMarker } from "react-native-maps";

type MapMarkerProps = Readonly<
  Pick<DataPoint, "id" | "latitude" | "longitude"> & {
    isActive?: boolean;
    onPress: () => void;
  }
>;

const MapMarker = function MapMarker(props: MapMarkerProps): React.JSX.Element {
  const { id, latitude, longitude, isActive, onPress } = props;
  const pinColor = isActive ? "#009900" : "#ea3535";

  return (
    <RNMapsMarker
      pinColor={pinColor}
      identifier={id}
      coordinate={{ latitude, longitude }}
      tracksViewChanges={false}
      onPress={onPress}
      testID="map-marker"
    />
  );
};

export default React.memo(MapMarker, (prevProps, nextProps) => {
  return prevProps.isActive === nextProps.isActive;
});
