import { DataPoint } from "@common/types";
import { INITIAL_REGION } from "@features/mapView/constants";
import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { createDataPointMock } from "@mocks/DataPoint.mock";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Platform } from "react-native";
import { Region } from "react-native-maps";

import MapView from "../MapView";

const onPressMock = jest.fn();
const onRegionChangeMock = jest.fn();
const markerMock = createDataPointMock();

const renderComponent = (activeMarker?: DataPoint) => {
  return render(
    <MapView
      markers={[markerMock]}
      onMarkerPress={onPressMock}
      onRegionChangeComplete={onRegionChangeMock}
      activeMarker={activeMarker}
    />
  );
};

describe("MapView", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders correctly", () => {
    renderComponent();

    expect(screen.getByTestId("map-view")).toBeTruthy();
    expect(screen.getByTestId("map-marker")).toBeTruthy();
  });

  it("renders active marker", () => {
    renderComponent(markerMock);

    expect(screen.getByTestId("map-marker").props.pinColor).toBe("#009900");
  });

  it("calls onPress handler when marker is pressed", () => {
    renderComponent();

    fireEvent.press(screen.getByTestId("map-marker"));

    expect(onPressMock).toBeCalledTimes(1);
  });

  it("does not calls onRegionChangeComplete when map ready on iOS", () => {
    renderComponent();
    Platform.OS = "ios";

    fireEvent(screen.getByTestId("map-view"), "onMapReady");

    expect(onRegionChangeMock).toBeCalledTimes(0);
  });

  it("calls onRegionChangeComplete when map ready on Android", () => {
    renderComponent();
    Platform.OS = "android";

    fireEvent(screen.getByTestId("map-view"), "onMapReady");

    expect(onRegionChangeMock).toBeCalledTimes(1);
    expect(onRegionChangeMock).toBeCalledWith(INITIAL_REGION);
  });

  it("calls onRegionChangeComplete when map region changes", () => {
    renderComponent();

    const nextRegion: Region = {
      latitude: 40.7128,
      longitude: -74.006,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };

    fireEvent(screen.getByTestId("map-view"), "onRegionChangeComplete", {
      region: nextRegion,
    });

    expect(onRegionChangeMock).toBeCalledTimes(1);
    expect(onRegionChangeMock).toBeCalledWith({
      region: nextRegion,
    });
  });
});
