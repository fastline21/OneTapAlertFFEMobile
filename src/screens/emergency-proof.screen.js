import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import Main from '../containers/main.screen';
import Loading from '../containers/loading.screen';

import CameraView from '../components/camera';

import {
  submitEmergencyProof,
  emergencyProofClearResponse,
} from '../stores/actions/emergency-proofs.action';

import { EMERGENCY_CATEGORIES } from '../constants/emergency-categories';

const EmergencyProofScreen = ({
  navigation,
  emergenciesState: { emergency },
  authState: { auth },
  emergencyProofsState: {
    loading: emergencyProofsLoading,
    success: emergencyProofsSuccess,
    error: emergencyProofsError,
    message: emergencyProofsMessage,
  },
  submitEmergencyProof,
  emergencyProofClearResponse,
}) => {
  const handleBackAction = () => {
    navigation.goBack();
  };

  const handleCapturePicture = (data) => {
    if (data) {
      const formData = new FormData();
      formData.append('user_id', auth.id);
      formData.append('emergency_id', emergency.id);
      formData.append('emergency_category_id', EMERGENCY_CATEGORIES.IMAGE);
      formData.append('captured_image_proof', {
        uri: data,
        type: 'image/jpeg',
        name: 'capture-image-proof.jpg',
      });
      submitEmergencyProof(formData);
    }
  };

  useEffect(() => {
    if (emergencyProofsSuccess) {
      Alert.alert('Suucess', 'You successfully submit an emergency proof');
      emergencyProofClearResponse();
      navigation.goBack();
    }

    if (emergencyProofsError) {
      Alert.alert('Error', emergencyProofsMessage);
      emergencyProofClearResponse();
    }
  }, [emergencyProofsSuccess, emergencyProofsError, emergencyProofsMessage]);

  if (emergencyProofsLoading) {
    return <Loading />;
  }

  return (
    <Main
      headerTitle='Emergency Proof'
      isBackAction={true}
      backAction={() => handleBackAction()}
    >
      <View>
        <CameraView capturedImage={(data) => handleCapturePicture(data)} />
      </View>
    </Main>
  );
};

EmergencyProofScreen.propTypes = {
  emergenciesState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
  emergencyProofsState: PropTypes.object.isRequired,
  submitEmergencyProof: PropTypes.func.isRequired,
  emergencyProofClearResponse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  emergenciesState: state.emergenciesState,
  authState: state.authState,
  emergencyProofsState: state.emergencyProofsState,
});

export default connect(mapStateToProps, {
  submitEmergencyProof,
  emergencyProofClearResponse,
})(EmergencyProofScreen);
