import { v4 as uuidv4 } from "uuid";

import {
  Connector,
  ConnectorStatus,
  ConnectorType,
  DataPoint,
  DataPointDto,
} from "./types";

export function toDataPoint(data: DataPointDto): DataPoint {
  const { _id: id, title, latitude, longitude } = data;
  const connectors = data.connectors.map(toConnector);
  return { id, title, latitude, longitude, connectors };
}

export function toConnector(
  data: DataPointDto["connectors"][number]
): Connector {
  const id = uuidv4();
  const status = toConnectorStatus(data.status);
  const type = toConnectorType(data.type);
  return { id, status, type };
}

export function toConnectorType(
  type: DataPointDto["connectors"][number]["type"]
): ConnectorType | never {
  switch (type) {
    case "J1772":
      return ConnectorType.J1772;
    case "Type 2":
      return ConnectorType.Type2;
    case "CCS 2":
      return ConnectorType.CCS2;
    case "Type 3":
      return ConnectorType.Type3;

    default:
      throw new Error(`Unknown connector type: ${type}`);
  }
}

export function toConnectorStatus(
  status: DataPointDto["connectors"][number]["status"]
): ConnectorStatus | never {
  switch (status) {
    case "available":
      return ConnectorStatus.available;
    case "unavailable":
      return ConnectorStatus.unavailable;

    default:
      throw new Error(`Unknown connector status: ${status}`);
  }
}
