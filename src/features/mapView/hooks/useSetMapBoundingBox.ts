import React from "react";

import { useAppDispatch } from "@common/store";
import { setMapBoundingBox } from "@features/mapView";
import { BoundingBox } from "react-native-maps";

export default function useSetMapBoundingBox() {
  const dispatch = useAppDispatch();

  return React.useCallback(
    (nextBounds?: BoundingBox) => dispatch(setMapBoundingBox(nextBounds)),
    [dispatch]
  );
}
