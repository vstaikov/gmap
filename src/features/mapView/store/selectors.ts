import { RootState } from "@common/store";
import { calcDataForBoundingBox } from "@common/utils";
import { createSelector } from "@reduxjs/toolkit";

const selectMapViewState = (state: RootState) => state.mapViewState;

export const selectIsLoading = createSelector(
  selectMapViewState,
  (state) => state.isLoading
);

const selectDataPoints = createSelector(
  selectMapViewState,
  (state) => state.dataPoints
);

const selectDataIndex = createSelector(
  selectMapViewState,
  (state) => state.dataIndex
);

const selectBoundingBox = createSelector(
  selectMapViewState,
  (state) => state.boundingBox
);

const selectActiveMarkerId = createSelector(
  selectMapViewState,
  (state) => state.activeMarkerId
);

export const selectMapMarkers = createSelector(
  [selectIsLoading, selectBoundingBox, selectDataPoints, selectDataIndex],
  (isLoading, boundingBox, dataPoints, dataIndex) => {
    if (isLoading || !dataPoints || !dataIndex || !boundingBox) {
      return [];
    }

    return calcDataForBoundingBox(boundingBox, dataIndex, dataPoints);
  }
);

export const selectActiveMarker = createSelector(
  [selectActiveMarkerId, selectDataPoints],
  (activeMarkerId, dataPoints) => {
    return dataPoints?.find((dp) => dp.id === activeMarkerId);
  }
);
