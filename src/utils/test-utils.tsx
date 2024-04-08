import React, { PropsWithChildren } from "react";

import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";

import { setupStore } from "../common/store/store";
import type { AppStore, RootState } from "../common/store/store";

export const createMockCreator =
  <T,>(baseMock: T) =>
  (partialMock: Partial<T> = {}): T =>
    Object.assign({}, baseMock, partialMock);

interface ExtendedRenderOptions {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
