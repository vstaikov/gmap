import React from "react";

import { DataPoint, DataPoints } from "@common/types";
import { INITIAL_REGION } from "@features/mapView/constants";
import { Platform, StyleSheet } from "react-native";
import RNMapView, { Region } from "react-native-maps";

import MapMarker from "./MapMarker";

type MapViewProps = Readonly<{
  markers: DataPoints;
  activeMarker?: DataPoint;
  onMarkerPress: (marker: DataPoint) => void;
  onRegionChangeComplete: (region: Region) => void;
}>;

const MapView = React.forwardRef<RNMapView, MapViewProps>(function MapView(
  props,
  ref
): React.JSX.Element {
  const { activeMarker, markers, onMarkerPress, onRegionChangeComplete } =
    props;

  const onPress = React.useCallback(
    (marker: DataPoint) => () => onMarkerPress(marker),
    [onMarkerPress]
  );

  const onReady = React.useCallback(() => {
    if (Platform.OS === "android") {
      onRegionChangeComplete(INITIAL_REGION);
    }
  }, [onRegionChangeComplete]);

  return (
    <RNMapView
      ref={ref}
      provider="google"
      style={styles.container}
      initialRegion={INITIAL_REGION}
      minZoomLevel={4}
      onRegionChangeComplete={onRegionChangeComplete}
      zoomControlEnabled={false}
      toolbarEnabled={false}
      moveOnMarkerPress={false}
      onMapReady={onReady}
      testID="map-view"
    >
      {markers.map((marker) => {
        const { id, latitude, longitude } = marker;
        const isActive = activeMarker?.id === id;
        return (
          <MapMarker
            // Fix issue on Android not updating pin color when marker is active
            key={`${id}-${isActive}`}
            id={id}
            latitude={latitude}
            longitude={longitude}
            isActive={isActive}
            onPress={onPress(marker)}
          />
        );
      })}
    </RNMapView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapView;
