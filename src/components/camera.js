import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import { Avatar } from 'react-native-paper';

import viewMapStyle from '../styles/view-map.style';
import viewMapButtonStyle from '../styles/view-map-button.style';

const CameraView = ({
  cameraType = 'back',
  cameraHeight = 200,
  capturedImage,
  showSubmitAfterCaptured = true,
}) => {
  const initialRatio = '1:1';

  const [camera, setCamera] = useState(null);
  const [ratio, setRatio] = useState(initialRatio);
  const [type, setType] = useState(CameraType[cameraType]);
  const [imageURI, setImageURI] = useState(null);
  const [imagePadding, setImagePadding] = useState(0);
  const { height, width } = Dimensions.get('window');
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);
  const [isShowSubmitAfterCaptured, setIsShowSubmitAfterCaptured] =
    useState(true);

  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title='grant permission' />
      </View>
    );
  }

  const prepareRatio = async () => {
    if (Platform.OS === 'android') {
      const ratios = await camera.getSupportedRatiosAsync();

      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(':');
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        const distance = screenRatio - realRatio;
        distances[ratio] = realRatio;

        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }

      const desiredRatio = minDistance;
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );

      setImagePadding(remainder);
      setRatio(desiredRatio);
      setIsRatioSet(true);
    }
  };

  const handleCameraReady = async () => {
    await prepareRatio();
  };

  const handleToggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const handleCapturePicture = async () => {
    const data = await camera.takePictureAsync();
    setImageURI(data.uri);
    setIsShowSubmitAfterCaptured(showSubmitAfterCaptured);

    if (!showSubmitAfterCaptured) {
      capturedImage(data.uri);
    }
  };

  const handleSubmit = () => {
    capturedImage(imageURI);
  };

  const handleCancel = () => {
    setImageURI(null);
    capturedImage(null);
  };

  return (
    <View style={{ height: Dimensions.get('window').height - cameraHeight }}>
      {imageURI ? (
        <>
          <ImageBackground
            source={{ uri: imageURI }}
            style={[
              viewMapStyle.inner,
              { height: Dimensions.get('window').height - cameraHeight },
            ]}
            resizeMode='stretch'
          />
          <View style={viewMapButtonStyle.outer}>
            {isShowSubmitAfterCaptured && (
              <TouchableOpacity onPress={() => handleSubmit()}>
                <Avatar.Icon icon='check' style={viewMapButtonStyle.inner} />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => handleCancel()}>
              <Avatar.Icon icon='close' style={viewMapButtonStyle.inner} />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Camera
          style={{ flex: 1 }}
          type={type}
          ref={(ref) => setCamera(ref)}
          onCameraReady={handleCameraReady}
          ratio={ratio}
        >
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'center',
              flexDirection: 'row',
              flex: 1,
              margin: 64,
            }}
          >
            <TouchableOpacity
              onPress={async () => await handleCapturePicture()}
            >
              <Avatar.Icon
                icon='camera'
                style={{ backgroundColor: 'transparent' }}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
};

export default CameraView;
