import React from "react";

import { store } from "@common/store";
import { MapViewContainer } from "@features/mapView";
import { Provider as StoreProvider } from "react-redux";

function App(): React.JSX.Element {
  return (
    <StoreProvider store={store}>
      <MapViewContainer />
    </StoreProvider>
  );
}

export default App;
