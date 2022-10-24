import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  inner: {
    width: Dimensions.get("screen").width / 2 - 50,
    height: 200,
    resizeMode: "stretch",
  },
  outer: {},
});
