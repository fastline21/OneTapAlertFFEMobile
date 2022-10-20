import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  inner: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  outer: {},
});
