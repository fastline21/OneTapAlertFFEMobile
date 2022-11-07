import { View, Text, Platform, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import StepIndicator from 'react-native-step-indicator';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import stepIndicatorStyle from '../styles/step-indicator.style';

import {
  registerUser,
  submitRegister,
  usersClearResponse,
} from '../stores/actions/users.action';
import { getAllBarangays } from '../stores/actions/barangays.action';

import Main from '../containers/main.screen';
import Loading from '../containers/loading.screen';

import RegisterSteps from '../components/register-steps';

const RegisterScreen = ({
  navigation,
  usersState: {
    registerUser: register,
    error: usersError,
    message: usersMessage,
    success: usersSuccess,
    loading: usersLoading,
  },
  barangaysState: { barangays },
  registerUser,
  getAllBarangays,
  submitRegister,
  usersClearResponse,
}) => {
  const labels = [
    'Personal Info',
    'Contact Info',
    'Contact Person',
    'Front ID',
    'Back ID',
    'Selfie',
    'Review',
  ];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: Platform.OS === 'ios' ? 13 : 12,
    labelAlign: 'flex-start',
    currentStepLabelColor: '#fe7013',
  };
  const [currentPosition, setCurrentPosition] = useState(0);

  const handleNext = () => {
    setCurrentPosition(currentPosition + 1);
  };

  const handlePrevious = () => {
    setCurrentPosition(currentPosition - 1);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleRegister = (data) => {
    registerUser(data);
  };

  const handleSubmit = (data) => {
    submitRegister(data);
  };

  const handleError = (data) => {
    Alert.alert('Error', data);
  };

  useEffect(() => {
    getAllBarangays();
  }, []);

  useEffect(() => {
    if (usersError) {
      Alert.alert('Error', usersMessage);
      usersClearResponse();
    }

    if (usersSuccess) {
      Alert.alert('Success', usersMessage);
      usersClearResponse();
      navigation.navigate('Login');
    }
  }, [usersSuccess, usersError, usersMessage]);

  if (usersLoading) {
    return <Loading />;
  }

  return (
    <Main>
      <View style={stepIndicatorStyle.outer}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
          stepCount={7}
        />
      </View>
      <View>
        <RegisterSteps
          step={currentPosition}
          next={() => handleNext()}
          previous={() => handlePrevious()}
          cancel={() => handleCancel()}
          register={(data) => handleRegister(data)}
          barangays={barangays}
          submit={(data) => handleSubmit(data)}
          registerUser={register}
          error={(data) => handleError(data)}
        />
      </View>
    </Main>
  );
};

RegisterScreen.propTypes = {
  usersState: PropTypes.object.isRequired,
  barangaysState: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  getAllBarangays: PropTypes.func.isRequired,
  submitRegister: PropTypes.func.isRequired,
  usersClearResponse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  usersState: state.usersState,
  barangaysState: state.barangaysState,
});

export default connect(mapStateToProps, {
  registerUser,
  getAllBarangays,
  submitRegister,
  usersClearResponse,
})(RegisterScreen);
