import React from "react";

import { useAppDispatch } from "@common/store";

import { fetchMapDataPoints } from "../store";

export default function useFetchMapDataPoints() {
  const dispatch = useAppDispatch();
  return React.useCallback(() => dispatch(fetchMapDataPoints()), [dispatch]);
}
