import { DataPointDto } from "@common/types";
import { describe, it, expect } from "@jest/globals";
import { createDataPointDtoMock } from "@mocks/DataPointDto.mock";
import { screen } from "@testing-library/react-native";
import { renderWithProviders } from "@utils/test-utils";
import axios from "axios";
import mockAxios from "axios-mock-adapter";

import MapViewContainer from "../MapViewContainer";

const dataPointDtoMock = createDataPointDtoMock();

const renderComponent = () => {
  return renderWithProviders(<MapViewContainer />);
};

describe("MapViewContainer", () => {
  const axiosMock = new mockAxios(axios);

  it("renders correctly", async () => {
    axiosMock
      .onGet("http://localhost:3000/points")
      .reply<DataPointDto[]>(200, [dataPointDtoMock]);

    renderComponent();

    expect(await screen.findByTestId("loading-view")).toBeTruthy();
    expect(await screen.findByTestId("map-view")).toBeTruthy();
    expect(screen.queryByTestId("loading-view")).not.toBeTruthy();
    expect(screen.queryByTestId("map-marker")).not.toBeTruthy();
  });
});
