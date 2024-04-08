import React from "react";

import { Connector as TConnector, ConnectorStatus } from "@common/types";
import { Text, StyleSheet } from "react-native";

type MarkerConnectorProps = Readonly<{ connector: TConnector }>;

function Connector(props: MarkerConnectorProps): React.JSX.Element {
  const { connector } = props;

  const statusStyle =
    connector.status === ConnectorStatus.available
      ? styles.available
      : styles.unavailable;

  return (
    <Text style={styles.container} testID="connector">
      {connector.type}:{" "}
      <Text style={statusStyle} testID="connector-status">
        {connector.status}
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "#333",
    fontSize: 15,
    marginTop: 5,
    textTransform: "capitalize",
  },
  available: { color: "#009900" },
  unavailable: { color: "#C70039" },
});

export default Connector;
