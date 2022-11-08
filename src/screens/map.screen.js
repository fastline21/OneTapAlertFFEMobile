import { View, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import Main from '../containers/main.screen';
import Loading from '../containers/loading.screen';

import Map from '../components/map';

import {
  changeEmergencyStatus,
  emergenciesClearResponse,
  clearEmergency,
} from '../stores/actions/emergencies.action';
import { logoutUser } from '../stores/actions/auth.action';

import { EMERGENCY_STATUSES } from '../constants/emergency-statuses';

const MapScreen = ({
  navigation,
  emergenciesState: {
    emergency,
    loading: emergenciesLoading,
    success: emergenciesSuccess,
    error: emergenciesError,
    message: emergenciesMessage,
  },
  changeEmergencyStatus,
  emergenciesClearResponse,
  clearEmergency,
  logoutUser,
}) => {
  const handleBackAction = () => {
    navigation.navigate('Responder');
    clearEmergency();
  };

  const handleDone = () => {
    changeEmergencyStatus({
      emergency_id: emergency.id,
      emergency_status_id: EMERGENCY_STATUSES.RESPONDED,
    });
  };

  const handleRequest = () => {
    navigation.navigate('RequestBackup');
  };

  const handleLogout = () => {
    logoutUser();
  };

  useEffect(() => {
    if (emergenciesSuccess) {
      navigation.navigate('IncidentReport');
      emergenciesClearResponse();
    }

    if (emergenciesError) {
      Alert.alert('Error', emergenciesMessage);
      emergenciesClearResponse();
    }
  }, [emergenciesSuccess, emergenciesError, emergenciesMessage]);

  if (emergenciesLoading) {
    return <Loading />;
  }

  return (
    <Main
      isBackAction={true}
      headerTitle='Emergency Map'
      backAction={() => handleBackAction()}
      logout={() => handleLogout()}
    >
      <View>
        <Map height={600} />
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
          <Button onPress={() => handleDone()} mode='contained'>
            Done
          </Button>
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Button onPress={() => handleRequest()} mode='contained'>
            Request
          </Button>
        </View>
      </View>
    </Main>
  );
};

MapScreen.propTypes = {
  emergenciesState: PropTypes.object.isRequired,
  changeEmergencyStatus: PropTypes.func.isRequired,
  emergenciesClearResponse: PropTypes.func.isRequired,
  clearEmergency: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  emergenciesState: state.emergenciesState,
});

export default connect(mapStateToProps, {
  changeEmergencyStatus,
  emergenciesClearResponse,
  clearEmergency,
  logoutUser,
})(MapScreen);
