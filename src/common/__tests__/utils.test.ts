import { DataPoint, DataPointDto } from "@common/types";
import { describe, it, expect } from "@jest/globals";
import { createDataPointMock } from "@mocks/DataPoint.mock";
import { createDataPointDtoMock } from "@mocks/DataPointDto.mock";
import axios from "axios";
import mockAxios from "axios-mock-adapter";
import KDBush from "kdbush";

import {
  calcDataForBoundingBox,
  createDataIndex,
  fetchDataPointsFromAPI,
} from "../utils";

const dataPointDtoMock = createDataPointDtoMock();
const markerMock: DataPoint = createDataPointMock();

describe("fetchDataPointsFromAPI", () => {
  const axiosMock = new mockAxios(axios);

  it("calls axios to fetch data and maps the response", async () => {
    axiosMock
      .onGet("http://localhost:3000/points")
      .reply<DataPointDto[]>(200, [dataPointDtoMock]);

    const response = await fetchDataPointsFromAPI();
    expect(response).toEqual([markerMock]);
  });
});

describe("createDataIndex", () => {
  it("creates KDBush instance and loads markers", () => {
    const dataIndex = createDataIndex([markerMock]);
    expect(dataIndex).toBeInstanceOf(KDBush);
    expect(Array.from(dataIndex.coords)).toEqual([1, 1]);
    expect(dataIndex._finished).toEqual(true);
  });
});

describe("calcDataForBoundingBox", () => {
  it("creates KDBush instance and loads markers", () => {
    const dataIndex = createDataIndex([markerMock]);
    const ids = calcDataForBoundingBox(
      {
        southWest: { latitude: 1, longitude: 1 },
        northEast: { latitude: 10, longitude: 10 },
      },
      dataIndex,
      [markerMock]
    );

    expect(ids).toEqual([markerMock]);
  });
});
