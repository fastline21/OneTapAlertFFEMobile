import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Image, ActivityIndicator, Dimensions } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useEffect } from 'react';

import Loading from '../containers/loading.screen';
import Main from '../containers/main.screen';

import { REACT_APP_SERVER_URL } from '@env';

import reviewPreviewImageStyle from '../styles/review-preview-image.style';

import {
  clearEmergency,
  changeEmergencyStatus,
  getAllEmergenciesByStatus,
  emergenciesClearResponse,
} from '../stores/actions/emergencies.action';

import { EMERGENCY_STATUSES } from '../constants/emergency-statuses';

const ViewEmergencyScreen = ({
  navigation,
  emergenciesState: {
    emergency,
    loading: emergenciesLoading,
    success: emergenciesSuccess,
    error: emergenciesError,
  },
  authState: { auth },
  clearEmergency,
  changeEmergencyStatus,
  getAllEmergenciesByStatus,
  emergenciesClearResponse,
}) => {
  const handleShowImage = (file) => {
    return `${REACT_APP_SERVER_URL}/captured-image/${file}`;
  };

  const handleBackAction = () => {
    navigation.goBack();
    clearEmergency();
  };

  const handleCancel = () => {
    navigation.goBack();
    clearEmergency();
  };

  const handleRespond = () => {
    changeEmergencyStatus({
      emergency_id: emergency.id,
      emergency_status_id: EMERGENCY_STATUSES.ONGOING,
      responder_id: auth.id,
    });
  };

  useEffect(() => {
    if (emergenciesSuccess) {
      getAllEmergenciesByStatus('pending');
      navigation.navigate('Map');
      emergenciesClearResponse();
    }
  }, [emergenciesSuccess]);

  if (emergenciesLoading) {
    return <Loading />;
  }

  return (
    <Main
      headerTitle='Resident Info'
      isBackAction={true}
      backAction={() => handleBackAction()}
    >
      <View
        style={{
          margin: 20,
          borderColor: '#000',
          borderWidth: 1,
          padding: 20,
        }}
      >
        <View style={{ marginVertical: 5 }}>
          <Text variant='labelLarge'>
            Name: {emergency.user.first_name} {emergency.user.middle_initial}.{' '}
            {emergency.user.last_name}
          </Text>
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text variant='labelLarge'>Address: {emergency.user.address}</Text>
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text variant='labelLarge'>
            Postal Code: {emergency.user.zip_code}
          </Text>
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text variant='labelLarge'>
            Barangay: {emergency.user.barangay.name}
          </Text>
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text variant='labelLarge'>Proof:</Text>
          {emergency.emergency_proof ? (
            <Image
              source={{
                uri: handleShowImage(emergency.emergency_proof.file),
              }}
              style={[reviewPreviewImageStyle.inner, { width: 'auto' }]}
              fadeDuration={1000}
              loadingIndicatorSource={<ActivityIndicator />}
            />
          ) : (
            <Text>No Proof</Text>
          )}
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
            <Button onPress={() => handleCancel()} mode='contained'>
              Cancel
            </Button>
          </View>
          <View style={{ marginHorizontal: 10 }}>
            <Button onPress={() => handleRespond()} mode='contained'>
              Respond
            </Button>
          </View>
        </View>
      </View>
    </Main>
  );
};

ViewEmergencyScreen.propTypes = {
  emergenciesState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
  clearEmergency: PropTypes.func.isRequired,
  changeEmergencyStatus: PropTypes.func.isRequired,
  getAllEmergenciesByStatus: PropTypes.func.isRequired,
  emergenciesClearResponse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  emergenciesState: state.emergenciesState,
  authState: state.authState,
});

export default connect(mapStateToProps, {
  clearEmergency,
  changeEmergencyStatus,
  getAllEmergenciesByStatus,
  emergenciesClearResponse,
})(ViewEmergencyScreen);
