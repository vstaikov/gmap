import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react-native";

import Loading from "../Loading";

const renderComponent = () => {
  render(<Loading />);
};

describe("Loading", () => {
  it("renders correctly", () => {
    renderComponent();

    expect(screen.getByTestId("loading-view")).toBeTruthy();
    expect(screen.getByText("Loading ...")).toBeTruthy();
  });
});
