import { View } from "react-native";
import { Text, Avatar } from "react-native-paper";

const Step7 = ({ nextStep, previousStep, submitRegister, registerUser }) => {
  const {
    firstName,
    middleInitial,
    lastName,
    address,
    postalCode,
    capturedImageFrontID,
    capturedImageBackID,
    capturedImageSelfie,
  } = registerUser;

  return (
    <View>
      <Text variant="labelLarge">
        Name: {firstName} {middleInitial}. {lastName}
      </Text>
      <Text variant="labelLarge">Address: {address}</Text>
      <Text variant="labelLarge">Postal Code: {postalCode}</Text>
      <Avatar.Image size={24} source={capturedImageFrontID} />
      <Text>{JSON.stringify(capturedImageFrontID)}</Text>
    </View>
  );
};

export default Step7;
