import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  inner: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    // height: 300,
  },
  outer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
