import { View, Image } from 'react-native';
import { Text, Avatar } from 'react-native-paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Main from '../containers/main.screen';

import reviewPreviewImageStyle from '../styles/review-preview-image.style';

import { REACT_APP_SERVER_URL } from '@env';

import { logoutUser } from '../stores/actions/auth.action';

const ProfileScreen = ({ navigation, authState: { auth }, logoutUser }) => {
  const handleBackAction = () => {
    navigation.goBack();
  };

  const handleShowImage = (file) => {
    return `${REACT_APP_SERVER_URL}/captured-image/${file}`;
  };

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <Main
      headerTitle={`Hello ${auth?.first_name} ${auth?.last_name}!`}
      logout={() => handleLogout()}
      isBackAction={true}
      backAction={() => handleBackAction()}
    >
      <View style={{ marginVertical: 50 }}>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Avatar.Image
            size={200}
            // source={require('../../assets/logo.png')}
            source={{ uri: handleShowImage(auth?.captured_image_selfie) }}
            style={{ backgroundColor: 'transparent' }}
          />
        </View>
        <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
          <Text variant='titleLarge'>Personal Information</Text>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 20,
            borderColor: '#000',
            borderWidth: 1,
            padding: 20,
          }}
        >
          <View>
            <Text variant='labelLarge'>
              Name: {auth?.first_name} {auth?.middle_initial}. {auth?.last_name}
            </Text>
          </View>
          <View>
            <Text variant='labelLarge'>Contact No.: {auth?.contact_no}</Text>
          </View>
          <View>
            <Text variant='labelLarge'>Address: {auth?.address}</Text>
          </View>
          <View>
            <Text variant='labelLarge'>Barangay: {auth?.barangay.name}</Text>
          </View>
          <View>
            <Text variant='labelLarge'>Postal Code: {auth?.zip_code}</Text>
          </View>
        </View>
        <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
          <Text variant='titleLarge'>Contact Person</Text>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 20,
            borderColor: '#000',
            borderWidth: 1,
            padding: 20,
          }}
        >
          <View>
            <Text variant='labelLarge'>
              Name: {auth?.contact_person.first_name}{' '}
              {auth?.contact_person.last_name}
            </Text>
          </View>
          <View>
            <Text variant='labelLarge'>
              Contact No.: {auth?.contact_person.contact_no}
            </Text>
          </View>
          <View>
            <Text variant='labelLarge'>
              Email Address: {auth?.contact_person.email_address}
            </Text>
          </View>
        </View>
        <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
          <Text variant='titleLarge'>ID</Text>
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
                source={{ uri: handleShowImage(auth?.captured_image_front_id) }}
                style={reviewPreviewImageStyle.inner}
              />
            </View>
            <View style={{ marginVertical: 5 }}>
              <Text variant='labelLarge'>Back ID:</Text>
              <Image
                source={{ uri: handleShowImage(auth?.captured_image_back_id) }}
                style={reviewPreviewImageStyle.inner}
              />
            </View>
          </View>
        </View>
      </View>
    </Main>
  );
};

ProfileScreen.propTypes = {
  authState: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authState,
});

export default connect(mapStateToProps, { logoutUser })(ProfileScreen);
