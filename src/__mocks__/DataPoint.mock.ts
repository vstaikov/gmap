import { DataPoint } from "@common/types";
import { createMockCreator } from "@utils/test-utils";

const dataPointMock: DataPoint = {
  id: "1",
  title: "Test marker",
  latitude: 1,
  longitude: 1,
  connectors: [
    { id: "1", type: "CCS 2", status: "available" },
    { id: "2", type: "CCS 2", status: "unavailable" },
    { id: "3", type: "J1772", status: "unavailable" },
    { id: "4", type: "J1772", status: "unavailable" },
    { id: "5", type: "Type 2", status: "available" },
    { id: "6", type: "Type 2", status: "unavailable" },
    { id: "7", type: "Type 3", status: "available" },
    { id: "8", type: "Type 3", status: "available" },
  ],
};

export const createDataPointMock = createMockCreator(dataPointMock);
