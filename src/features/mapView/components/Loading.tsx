import React from "react";

import { Text, StyleSheet, View } from "react-native";

function Loading(): React.JSX.Element {
  return (
    <View style={styles.container} testID="loading-view">
      <Text style={styles.label}>Loading ...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, .9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Loading;
