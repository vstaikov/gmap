import { Connector } from "@common/types";
import { createMockCreator } from "@utils/test-utils";

const connectorMock: Connector = {
  id: "1",
  type: "CCS 2",
  status: "available",
};

export const createConnectorMock = createMockCreator(connectorMock);
