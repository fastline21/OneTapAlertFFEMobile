import { View, Image } from 'react-native';
import { Text, Avatar, Button } from 'react-native-paper';

import reviewPreviewImageStyle from '../../styles/review-preview-image.style';

import { USER_TYPES } from '../../constants/user-types';

const Step7 = ({
  nextStep,
  previousStep,
  submitRegister,
  registerUser,
  errorStep,
}) => {
  const {
    firstName,
    middleInitial,
    lastName,
    address,
    postalCode,
    barangayID,
    emailAddress,
    username,
    password,
    password2,
    contactNo,
    city,
    contactPerson,
    capturedImageFrontID,
    capturedImageBackID,
    capturedImageSelfie,
  } = registerUser;

  const handleSubmit = () => {
    if (
      !firstName ||
      !middleInitial ||
      !lastName ||
      !address ||
      !postalCode ||
      !barangayID ||
      !emailAddress ||
      !username ||
      !password ||
      !password2 ||
      !contactNo ||
      !city ||
      !capturedImageFrontID ||
      !capturedImageBackID ||
      !capturedImageSelfie
    ) {
      if (!imageURI) {
        errorStep('Please fill out all required fields');
        return;
      }
    }

    const formData = new FormData();
    formData.append('user_type_id', USER_TYPES.RESIDENT);
    formData.append('first_name', firstName);
    formData.append('middle_initial', middleInitial);
    formData.append('last_name', lastName);
    formData.append('address', address);
    formData.append('barangay_id', barangayID);
    formData.append('email_address', emailAddress);
    formData.append('zip_code', postalCode);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('password_2', password2);
    formData.append('contact_no', contactNo);
    formData.append('city', city);
    formData.append('contact_person', JSON.stringify(contactPerson));
    formData.append('captured_image_front_id', {
      uri: capturedImageFrontID,
      type: 'image/jpeg',
      name: 'capture-image-front-id.jpg',
    });
    formData.append('captured_image_back_id', {
      uri: capturedImageBackID,
      type: 'image/jpeg',
      name: 'capture-image-back-id.jpg',
    });
    formData.append('captured_image_selfie', {
      uri: capturedImageSelfie,
      type: 'image/jpeg',
      name: 'capture-image-selfie.jpg',
    });
    submitRegister(formData);
  };

  const handlePrevious = () => {
    previousStep();
  };

  return (
    <>
      <View
        style={{
          marginHorizontal: 20,
          marginBottom: 20,
          borderColor: '#000',
          borderWidth: 1,
          padding: 20,
        }}
      >
        <View style={{ marginVertical: 5 }}>
          <Text variant='labelLarge'>
            Name: {firstName} {middleInitial}. {lastName}
          </Text>
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text variant='labelLarge'>Address: {address}</Text>
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text variant='labelLarge'>Postal Code: {postalCode}</Text>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          borderColor: '#000',
          borderWidth: 1,
          padding: 20,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ marginVertical: 5 }}>
            <Text variant='labelLarge'>Front ID:</Text>
            <Image
              source={{ uri: capturedImageFrontID }}
              style={reviewPreviewImageStyle.inner}
            />
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text variant='labelLarge'>Back ID:</Text>
            <Image
              source={{ uri: capturedImageBackID }}
              style={reviewPreviewImageStyle.inner}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignSelf: 'center',
          }}
        >
          <View style={{ marginVertical: 5 }}>
            <Text variant='labelLarge'>Selfie:</Text>
            <Image
              source={{ uri: capturedImageSelfie }}
              style={reviewPreviewImageStyle.inner}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginVertical: 20,
        }}
      >
        <View style={{ marginHorizontal: 10 }}>
          <Button onPress={handlePrevious} mode='contained'>
            Previous
          </Button>
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Button onPress={handleSubmit} mode='contained'>
            Submit
          </Button>
        </View>
      </View>
    </>
  );
};

export default Step7;
