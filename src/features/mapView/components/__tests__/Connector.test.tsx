import { Connector as TConnector } from "@common/types";
import { describe, it, expect } from "@jest/globals";
import { createConnectorMock } from "@mocks/Connector.mock";
import { render, screen } from "@testing-library/react-native";

import Connector from "../Connector";

const availableConnectorMock = createConnectorMock();
const unavailableConnectorMock = createConnectorMock({ status: "unavailable" });

const renderComponent = (connector: TConnector) => {
  render(<Connector connector={connector} />);
};

describe("Connector", () => {
  it("renders correctly", () => {
    renderComponent(availableConnectorMock);

    expect(screen.getByTestId("connector")).toBeTruthy();

    expect(
      screen.getByText(
        `${availableConnectorMock.type}: ${availableConnectorMock.status}`
      )
    ).toBeTruthy();
  });

  it("renders correct status color when status is available", () => {
    renderComponent(availableConnectorMock);

    const statusText = screen.getByTestId("connector-status");

    expect(statusText).toHaveStyle({ color: "#009900" });
  });

  it("renders correct status color when status is unavailable", () => {
    renderComponent(unavailableConnectorMock);

    const statusText = screen.getByTestId("connector-status");

    expect(statusText).toHaveStyle({ color: "#C70039" });
  });
});
