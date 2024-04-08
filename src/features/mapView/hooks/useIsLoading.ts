import { useAppSelector } from "@common/store";
import { selectIsLoading } from "@features/mapView";

export default function useIsLoading() {
  return useAppSelector(selectIsLoading);
}
