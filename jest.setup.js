jest.useFakeTimers();

jest.mock("react-native-maps", () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require("react");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { View } = require("react-native");

  class MockMapView extends React.Component {
    render() {
      const { testID, children, ...props } = this.props;
      return <View {...{ ...props, testID }}>{children}</View>;
    }
  }

  class MockMarker extends React.Component {
    render() {
      const { testID, children, ...props } = this.props;
      return <View {...{ ...props, testID }}>{children}</View>;
    }
  }

  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
    enableLatestRenderer: jest.fn(),
  };
});

jest.mock("uuid", () => {
  let id = 1;
  return { v4: () => (id++).toString() };
});
