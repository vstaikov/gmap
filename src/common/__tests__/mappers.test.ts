import { DataPointDto } from "@common/types";
import { describe, it, expect } from "@jest/globals";
import { createDataPointMock } from "@mocks/DataPoint.mock";
import { createDataPointDtoMock } from "@mocks/DataPointDto.mock";

import { toDataPoint } from "../mappers";

const dataPointDtoMock = createDataPointDtoMock();
const unknownConnectorTypeDataPointDtoMock = createDataPointDtoMock({
  connectors: [
    {
      type: "Dummy type" as DataPointDto["connectors"][0]["type"],
      status: "available",
    },
  ],
});
const unknownConnectorStatusDataPointDtoMock = createDataPointDtoMock({
  connectors: [
    {
      type: "CCS 2",
      status: "dummy status" as DataPointDto["connectors"][0]["status"],
    },
  ],
});

const markerMock = createDataPointMock();

describe("toDataPoint", () => {
  it("maps DataPointDto to DataPoint", () => {
    const result = toDataPoint(dataPointDtoMock);
    expect(result).toEqual(markerMock);
  });

  it("throws and error when connector type is unknown", () => {
    expect(() =>
      toDataPoint(unknownConnectorTypeDataPointDtoMock)
    ).toThrowError("Unknown connector type: Dummy type");
  });

  it("throws and error when connector status is unknown", () => {
    expect(() =>
      toDataPoint(unknownConnectorStatusDataPointDtoMock)
    ).toThrowError("Unknown connector status: dummy status");
  });
});
