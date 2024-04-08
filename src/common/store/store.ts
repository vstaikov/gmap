import { mapReducer } from "@features/mapView";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import reactotron from "../../../reactotron";

export const rootReducer = combineReducers({
  mapViewState: mapReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({ serializableCheck: false });
    },
    enhancers: (getDefaultEnhancers) => {
      return getDefaultEnhancers().concat(reactotron.createEnhancer());
    },
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export default setupStore();

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
