import * as Location from 'expo-location';

export const getLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    throw Error('Permission to access location was denied');
  }

  return await Location.getCurrentPositionAsync({});
};

export const getGeoLocation = async ({ latitude, longitude }) => {
  return await Location.reverseGeocodeAsync({ latitude, longitude });
};
