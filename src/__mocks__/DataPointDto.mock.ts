import { DataPointDto } from "@common/types";
import { createMockCreator } from "@utils/test-utils";

const dataPointDtoMock: DataPointDto = {
  _id: "1",
  title: "Test marker",
  latitude: 1,
  longitude: 1,
  connectors: [
    { type: "CCS 2", status: "available" },
    { type: "CCS 2", status: "unavailable" },
    { type: "J1772", status: "unavailable" },
    { type: "J1772", status: "unavailable" },
    { type: "Type 2", status: "available" },
    { type: "Type 2", status: "unavailable" },
    { type: "Type 3", status: "available" },
    { type: "Type 3", status: "available" },
  ],
};

export const createDataPointDtoMock = createMockCreator(dataPointDtoMock);
