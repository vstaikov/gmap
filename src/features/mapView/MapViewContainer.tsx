import React from "react";

import { DataPoint } from "@common/types";
import RNMaps from "react-native-maps";

import { Loading, MapView, MarkerDetails } from "./components";
import {
  useActiveMarker,
  useFetchMapDataPoints,
  useIsLoading,
  useMapMarkers,
  useSetActiveMarkerId,
  useSetMapBoundingBox,
} from "./hooks";

function MapViewContainer(): React.JSX.Element {
  const mapRef = React.useRef<RNMaps>(null);
  const fetchDataPoints = useFetchMapDataPoints();
  const isLoading = useIsLoading();
  const markers = useMapMarkers();
  const activeMarker = useActiveMarker();
  const setActiveMarkerId = useSetActiveMarkerId();
  const setMapBoundingBox = useSetMapBoundingBox();

  const handleRegionChange = React.useCallback(
    async function handleRegionChange() {
      const nextBounds = await mapRef.current?.getMapBoundaries();
      setMapBoundingBox(nextBounds);
    },
    [setMapBoundingBox]
  );

  const handleMarkerPress = React.useCallback(
    function handleMarkerPress(marker: DataPoint) {
      setActiveMarkerId(marker.id);
    },
    [setActiveMarkerId]
  );

  const handleCloseDetails = React.useCallback(
    function handleCloseDetails() {
      setActiveMarkerId();
    },
    [setActiveMarkerId]
  );

  React.useEffect(() => {
    const fetching = fetchDataPoints();
    return () => {
      fetching.abort();
    };
  }, [fetchDataPoints]);

  return (
    <>
      <MapView
        ref={mapRef}
        markers={markers}
        activeMarker={activeMarker}
        onMarkerPress={handleMarkerPress}
        onRegionChangeComplete={handleRegionChange}
      />
      <MarkerDetails marker={activeMarker} onClose={handleCloseDetails} />
      {isLoading && <Loading />}
    </>
  );
}

export default React.memo(MapViewContainer);
