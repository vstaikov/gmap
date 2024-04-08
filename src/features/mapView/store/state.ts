import { DataPoints } from "@common/types";
import { createDataIndex } from "@common/utils";
import { createReducer } from "@reduxjs/toolkit";
import KDBush from "kdbush";
import { BoundingBox } from "react-native-maps";

import { setActiveMarkerId, setMapBoundingBox } from "./actions";
import { fetchMapDataPoints } from "./thunks";

export interface MapViewState {
  isLoading: boolean;
  dataPoints?: DataPoints;
  dataIndex?: KDBush;
  boundingBox?: BoundingBox;
  activeMarkerId?: string;
}

const initialState: MapViewState = {
  isLoading: true,
};

export const mapReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchMapDataPoints.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(fetchMapDataPoints.fulfilled, (state, action) => {
    state.dataPoints = action.payload;
    state.dataIndex = createDataIndex(action.payload);
    state.isLoading = false;
  });
  builder.addCase(fetchMapDataPoints.rejected, (state) => {
    state.isLoading = false;
  });

  builder.addCase(setMapBoundingBox, (state, action) => {
    state.boundingBox = action.payload;
  });
  builder.addCase(setActiveMarkerId, (state, action) => {
    state.activeMarkerId = action.payload;
  });
});
