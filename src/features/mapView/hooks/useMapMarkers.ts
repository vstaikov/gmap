import { useAppSelector } from "@common/store";

import { selectMapMarkers } from "../store/selectors";

export default function useMapMarkers() {
  return useAppSelector(selectMapMarkers);
}
