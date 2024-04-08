import React from "react";

import { useAppDispatch } from "@common/store";
import { setActiveMarkerId } from "@features/mapView";

export default function useSetActiveMarkerId() {
  const dispatch = useAppDispatch();

  return React.useCallback(
    (markerId?: string) => dispatch(setActiveMarkerId(markerId)),
    [dispatch]
  );
}
