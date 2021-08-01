import React from "react";
import { useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  Easing
} from "react-native-reanimated";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "orange",
    position: "absolute",
    top: 20,
    left: 20,
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: "orange",
  },
});

const Anim1 = () => {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = 360;
  }, []);

  const circleStyle = useAnimatedStyle(() => {
    console.log("offsetX => ", offsetX.value);
    console.log("offsetY => ", offsetY.value);

    return {
      transform: [
        { translateX: withSpring(offsetX.value) },
        { translateY: withSpring(offsetY.value) },
      ],
    };
  });

  const squareStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: withRepeat(withTiming(`${rotate.value}deg`, {
            duration: 800,
            easing: Easing.out(Easing.exp),
          }), -1),
        },

        // {
        //   rotateZ: withRepeat(withSpring(`${rotate.value}deg`), -1),
        // },

      ],
    };
  });

  const onMove = () => {
    offsetX.value = Math.random() * 255;
    offsetY.value = Math.random() * 255;
  };

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.circle, circleStyle]} />
      <Animated.View style={[styles.square, squareStyle]} />

      <Button style={styles.button} onPress={onMove} title="Move" />
    </View>
  );
};

export default Anim1;
