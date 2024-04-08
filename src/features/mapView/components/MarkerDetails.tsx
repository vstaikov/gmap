import React from "react";

import { DataPoint } from "@common/types";
import {
  Animated,
  View,
  Pressable,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

import Connector from "./Connector";

type MarkerDetailsProps = Readonly<{
  marker?: DataPoint;
  onClose: () => void;
}>;

function useAnimatedStyles(isVisible: boolean): {
  backgroundColor: Animated.AnimatedInterpolation<string>;
  translateY: Animated.AnimatedInterpolation<number>;
} {
  const { height: screenHeight } = useWindowDimensions();
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      useNativeDriver: true,
      duration: 150,
      toValue: isVisible ? 1 : 0,
    }).start();
  }, [isVisible, animatedValue]);

  return {
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgba(0,0,0,0)", "rgba(0,0,0,0.25)"],
      extrapolate: "clamp",
    }),
    translateY: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [screenHeight, 0],
      extrapolate: "clamp",
    }),
  };
}

const MarkerDetails = function MarkerDetails(
  props: MarkerDetailsProps
): React.JSX.Element | null {
  const { marker, onClose } = props;
  const isVisible = !!marker;
  const { backgroundColor, translateY } = useAnimatedStyles(isVisible);
  const pointerEvents = isVisible ? "auto" : "none";

  return (
    <View style={[styles.container, { pointerEvents }]} testID="marker-details">
      <Pressable
        onPress={onClose}
        style={[styles.backdropWrapper, { pointerEvents }]}
        testID="backdrop-pressable"
      >
        <Animated.View style={[styles.backdrop, { backgroundColor }]} />
      </Pressable>

      <Animated.View style={[styles.modal, { transform: [{ translateY }] }]}>
        <Text style={styles.title}>{marker?.title}</Text>
        <Text style={styles.location}>
          Lt: {marker?.latitude}, Lg: {marker?.longitude}
        </Text>
        {marker?.connectors.map((connector) => (
          <Connector key={connector.id} connector={connector} />
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    pointerEvents: "none",
  },
  backdropWrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "transparent",
    pointerEvents: "none",
  },
  modal: {
    zIndex: 2,
    flex: 1,
    padding: 20,
    paddingBottom: 30,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: "#fff",
    maxHeight: "100%",
    overflow: "scroll",
  },
  title: {
    color: "#333",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
  },
  location: {
    color: "#333",
    fontSize: 15,
    marginTop: 5,
    textTransform: "capitalize",
  },
});

export default MarkerDetails;
