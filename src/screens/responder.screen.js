import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { View } from 'react-native';
import { DataTable, Button, Typograpy, Text } from 'react-native-paper';

import Main from '../containers/main.screen';
import Loading from '../containers/loading.screen';

import { logoutUser } from '../stores/actions/auth.action';
import {
  getAllEmergenciesByStatus,
  getEmergency,
  getCurrentEmergencyByResponder,
} from '../stores/actions/emergencies.action';

import tableStyle from '../styles/table.style';

import { EMERGENCY_STATUSES } from '../constants/emergency-statuses';

const ResponderScreen = ({
  navigation,
  authState: { auth },
  emergenciesState: { emergencies, loading: emergenciesLoading, emergency },
  logoutUser,
  getAllEmergenciesByStatus,
  getEmergency,
  getCurrentEmergencyByResponder,
}) => {
  useEffect(() => {
    if (!auth) {
      navigation.navigate('Login');
    }
  }, [auth]);

  useEffect(() => {
    handleOnRefresh();
  }, []);

  const handleLogout = () => {
    logoutUser();
  };

  const handleViewEmergency = (emergencyID) => {
    getEmergency(emergencyID);
  };

  const handleProfile = () => {
    navigation.push('Profile');
  };

  const handleOnRefresh = () => {
    getAllEmergenciesByStatus('pending');
    getCurrentEmergencyByResponder({
      responder_id: auth.id,
      emergency_status_id: EMERGENCY_STATUSES.ONGOING,
    });
  };

  useEffect(() => {
    if (emergency) {
      if (emergency.emergency_status_id === EMERGENCY_STATUSES.ONGOING) {
        navigation.navigate('Map');
      }

      if (emergency.emergency_status_id === EMERGENCY_STATUSES.PENDING) {
        navigation.navigate('ViewEmergency');
      }
    }
  }, [emergency]);

  if (emergenciesLoading) {
    return <Loading />;
  }

  return (
    <Main
      headerTitle={`Hello ${auth?.first_name} ${auth?.last_name}!`}
      logout={() => handleLogout()}
      profileAction={() => handleProfile()}
      isRefresh={true}
      getDataOnRefresh={() => handleOnRefresh()}
    >
      {emergencies.length > 0 ? (
        <View style={tableStyle.outer}>
          <DataTable style={tableStyle.inner}>
            <DataTable.Header>
              <DataTable.Title>#</DataTable.Title>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Disaster</DataTable.Title>
              <DataTable.Title>Status</DataTable.Title>
              <DataTable.Title>Action</DataTable.Title>
            </DataTable.Header>
            {emergencies?.map((data, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{index + 1}</DataTable.Cell>
                <DataTable.Cell>{`${data.user.first_name} ${data.user.last_name}`}</DataTable.Cell>
                <DataTable.Cell>{data.emergency_type.name}</DataTable.Cell>
                <DataTable.Cell>{data.emergency_status.name}</DataTable.Cell>
                <View style={{ justifyContent: 'center' }}>
                  <Button
                    mode='contained'
                    onPress={() => handleViewEmergency(data.id)}
                  >
                    View
                  </Button>
                </View>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      ) : (
        <View style={tableStyle.outer}>
          <Text>No Pending Emergencies found</Text>
        </View>
      )}
    </Main>
  );
};

ResponderScreen.propTypes = {
  authState: PropTypes.object.isRequired,
  emergenciesState: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  getAllEmergenciesByStatus: PropTypes.func.isRequired,
  getEmergency: PropTypes.func.isRequired,
  getCurrentEmergencyByResponder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authState,
  emergenciesState: state.emergenciesState,
});

export default connect(mapStateToProps, {
  logoutUser,
  getAllEmergenciesByStatus,
  getEmergency,
  getCurrentEmergencyByResponder,
})(ResponderScreen);
