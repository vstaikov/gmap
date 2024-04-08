import { LatLng } from "react-native-maps";

export type Maybe<T> = T | undefined;

export type DataPointDto = {
  _id: string;
  title: string;
  latitude: number;
  longitude: number;
  connectors: Array<{
    type: "J1772" | "Type 2" | "CCS 2" | "Type 3";
    status: "available" | "unavailable";
  }>;
};

export const ConnectorStatus = {
  available: "available",
  unavailable: "unavailable",
} as const;

export type ConnectorStatus =
  (typeof ConnectorStatus)[keyof typeof ConnectorStatus];

export const ConnectorType = {
  J1772: "J1772",
  Type2: "Type 2",
  CCS2: "CCS 2",
  Type3: "Type 3",
} as const;

export type ConnectorType = (typeof ConnectorType)[keyof typeof ConnectorType];

export type Connector = {
  id: string;
  type: ConnectorType;
  status: ConnectorStatus;
};

export type DataPoint = LatLng & {
  id: string;
  title: string;
  connectors: Array<Connector>;
};

export type DataPoints = DataPoint[];
