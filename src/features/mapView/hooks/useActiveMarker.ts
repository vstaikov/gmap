import { useAppSelector } from "@common/store";
import { selectActiveMarker } from "@features/mapView";

export default function useActiveMarker() {
  return useAppSelector(selectActiveMarker);
}
