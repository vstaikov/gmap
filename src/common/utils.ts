import axios from "axios";
import KDBush from "kdbush";
import { BoundingBox } from "react-native-maps";

import { toDataPoint } from "./mappers";
import { DataPointDto, DataPoints } from "./types";

export async function fetchDataPointsFromAPI(): Promise<DataPoints> {
  const { data } = await axios.get<DataPointDto[]>(
    "http://localhost:3000/points"
  );
  return data.map(toDataPoint);
}

export function createDataIndex(data: DataPoints): KDBush {
  const dataIndex = new KDBush(data.length, 8);
  data.forEach(({ latitude: lt, longitude: lg }) => dataIndex.add(lt, lg));
  return dataIndex.finish();
}

export function calcDataForBoundingBox(
  boundingBox: BoundingBox,
  dataIndex: KDBush,
  dataPoints: DataPoints
): DataPoints {
  const { northEast: ne, southWest: sw } = boundingBox;
  return dataIndex
    .range(sw.latitude, sw.longitude, ne.latitude, ne.longitude)
    .map((index) => dataPoints[index]);
}
