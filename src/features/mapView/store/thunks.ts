import { DataPoints } from "@common/types";
import { fetchDataPointsFromAPI } from "@common/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMapDataPoints = createAsyncThunk<DataPoints>(
  "mapViewState/fetchMapDataPoints",
  async () => {
    return await fetchDataPointsFromAPI();
  }
);
