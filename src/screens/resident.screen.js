import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { EMERGENCY_TYPES } from '../constants/emergency-types';

import emergencyTypesButtonStyle from '../styles/emergency-types-button.style';

import Main from '../containers/main.screen';

import Map from '../components/map';

import {
  submitEmergency,
  emergenciesClearResponse,
} from '../stores/actions/emergencies.action';
import { logoutUser } from '../stores/actions/auth.action';

const ResidentScreen = ({
  navigation,
  authState: { auth },
  locationState: { location },
  emergenciesState: { success: emergenciesSuccess, error: emergenciesError },
  submitEmergency,
  emergenciesClearResponse,
  logoutUser,
}) => {
  const handleEmergency = (emergencyTypeID) => {
    const { latitude, longitude } = location;
    submitEmergency({
      user_id: auth.id,
      emergency_type_id: emergencyTypeID,
      latitude,
      longitude,
    });
  };

  const handleLogout = () => {
    logoutUser();
  };

  useEffect(() => {
    if (!auth) {
      navigation.navigate('Login');
    }
  }, [auth]);

  useEffect(() => {
    if (emergenciesSuccess) {
      Alert.alert(
        'Success',
        'You successfully submit an emergency. Do you want to capture a proof?',
        [
          {
            text: 'Yes',
            onPress: () => alert('yes'),
          },
          {
            text: 'No',
            style: 'cancel',
            onPress: () => alert('no'),
          },
        ]
      );
      emergenciesClearResponse();
    }
  }, [emergenciesSuccess, emergenciesError]);

  return (
    <Main
      headerTitle={`Hello ${auth?.first_name} ${auth?.last_name}!`}
      logout={() => handleLogout()}
    >
      <View style={{ marginBottom: 30 }}>
        <Map height={300} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          style={[
            emergencyTypesButtonStyle.outer,
            emergencyTypesButtonStyle.inner.fireColor,
          ]}
          onPress={() => handleEmergency(EMERGENCY_TYPES.FIRE)}
        >
          <Text style={emergencyTypesButtonStyle.inner.text}>Fire</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            emergencyTypesButtonStyle.outer,
            emergencyTypesButtonStyle.inner.floodColor,
          ]}
          onPress={() => handleEmergency(EMERGENCY_TYPES.FLOOD)}
        >
          <Text style={emergencyTypesButtonStyle.inner.text}>Flood</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            emergencyTypesButtonStyle.outer,
            emergencyTypesButtonStyle.inner.earthquakeColor,
          ]}
          onPress={() => handleEmergency(EMERGENCY_TYPES.EARTHQUAKE)}
        >
          <Text style={emergencyTypesButtonStyle.inner.text}>Earthquake</Text>
        </TouchableOpacity>
      </View>
    </Main>
  );
};

ResidentScreen.propTypes = {
  authState: PropTypes.object.isRequired,
  locationState: PropTypes.object.isRequired,
  emergenciesState: PropTypes.object.isRequired,
  submitEmergency: PropTypes.func.isRequired,
  emergenciesClearResponse: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authState,
  locationState: state.locationState,
  emergenciesState: state.emergenciesState,
});

export default connect(mapStateToProps, {
  submitEmergency,
  emergenciesClearResponse,
  logoutUser,
})(ResidentScreen);
