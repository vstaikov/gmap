import { DataPoint } from "@common/types";
import { jest, describe, it, expect } from "@jest/globals";
import { createDataPointMock } from "@mocks/DataPoint.mock";
import { fireEvent, render, screen } from "@testing-library/react-native";

import MarkerDetails from "../MarkerDetails";

const markerMock = createDataPointMock();
const onCloseMock = jest.fn();

const renderComponent = (marker?: DataPoint) => {
  return render(<MarkerDetails onClose={onCloseMock} marker={marker} />);
};

describe("MarkerDetails", () => {
  it("renders correctly", () => {
    renderComponent(markerMock);

    expect(screen.getByTestId("marker-details")).toBeTruthy();

    expect(screen.getByText(markerMock.title)).toBeTruthy();

    expect(
      screen.getByText(
        `Lt: ${markerMock.latitude}, Lg: ${markerMock.longitude}`
      )
    ).toBeTruthy();

    expect(
      screen.getByText(
        `${markerMock.connectors[0].type}: ${markerMock.connectors[0].status}`
      )
    ).toBeTruthy();

    expect(
      screen.getByText(
        `${markerMock.connectors[1].type}: ${markerMock.connectors[1].status}`
      )
    ).toBeTruthy();
  });

  it("calls onClose handler when backdrop is pressed", () => {
    renderComponent(markerMock);

    fireEvent.press(screen.getByTestId("backdrop-pressable"));

    expect(onCloseMock).toBeCalledTimes(1);
  });

  it("renders active marker correctly", () => {
    renderComponent();

    expect(screen.getByTestId("marker-details")).toHaveStyle({
      pointerEvents: "none",
    });
    expect(screen.getByTestId("backdrop-pressable")).toHaveStyle({
      pointerEvents: "none",
    });
  });
});
