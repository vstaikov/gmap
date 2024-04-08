import { jest, describe, it, expect } from "@jest/globals";
import { createDataPointMock } from "@mocks/DataPoint.mock";
import { fireEvent, render, screen } from "@testing-library/react-native";

import MapMarker from "../MapMarker";

const onPressMock = jest.fn();
const markerMock = createDataPointMock();

const renderComponent = (isActive = false) => {
  return render(
    <MapMarker
      id={markerMock.id}
      latitude={markerMock.latitude}
      longitude={markerMock.longitude}
      onPress={onPressMock}
      isActive={isActive}
    />
  );
};

describe("MapMarker", () => {
  it("renders correctly", () => {
    const { rerender } = render(
      <MapMarker
        id={markerMock.id}
        latitude={markerMock.latitude}
        longitude={markerMock.longitude}
        onPress={onPressMock}
        isActive={false}
      />
    );

    const marker = screen.getByTestId("map-marker");

    expect(marker.props.pinColor).toBe("#ea3535");

    rerender(
      <MapMarker
        id={markerMock.id}
        latitude={markerMock.latitude}
        longitude={markerMock.longitude}
        onPress={onPressMock}
        isActive={true}
      />
    );

    expect(marker.props.pinColor).toBe("#009900");
  });

  it("calls onPress handler when marker is pressed", () => {
    renderComponent();

    fireEvent.press(screen.getByTestId("map-marker"));

    expect(onPressMock).toBeCalledTimes(1);
  });
});
