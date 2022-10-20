import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useState } from "react";

import CameraView from "../camera";

const Step4 = ({ nextStep, previousStep, registerStep }) => {
  const [imageURI, setImageURI] = useState(null);

  const handleNext = () => {
    registerStep({ capturedImageFrontID: imageURI });
    nextStep();
  };

  const handlePrevious = () => {
    previousStep();
  };

  const handleCapturePicture = (data) => {
    setImageURI(data);
  };

  return (
    <>
      <CameraView
        cameraHeight={250}
        showSubmitAfterCaptured={false}
        capturedImage={(data) => handleCapturePicture(data)}
      />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginVertical: 20,
        }}
      >
        <View style={{ marginHorizontal: 10 }}>
          <Button onPress={handlePrevious} mode="contained">
            Previous
          </Button>
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Button onPress={handleNext} mode="contained">
            Next
          </Button>
        </View>
      </View>
    </>
  );
};

export default Step4;
