import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { View } from 'react-native';
import { DataTable, Button } from 'react-native-paper';

import Main from '../containers/main.screen';
import Loading from '../containers/loading.screen';

import { logoutUser } from '../stores/actions/auth.action';
import {
  getAllEmergenciesByStatus,
  getEmergency,
} from '../stores/actions/emergencies.action';

import tableStyle from '../styles/table.style';

const ResponderScreen = ({
  navigation,
  authState: { auth },
  emergenciesState: { emergencies, loading: emergenciesLoading },
  logoutUser,
  getAllEmergenciesByStatus,
  getEmergency,
}) => {
  useEffect(() => {
    if (!auth) {
      navigation.navigate('Login');
    }
  }, [auth]);

  useEffect(() => {
    getAllEmergenciesByStatus('pending');
  }, []);

  const handleLogout = () => {
    logoutUser();
  };

  const handleViewEmergency = (emergencyID) => {
    getEmergency(emergencyID);
    navigation.navigate('ViewEmergency');
  };

  const handleProfile = () => {
    navigation.push('Profile');
  };

  if (emergenciesLoading) {
    return <Loading />;
  }

  return (
    <Main
      headerTitle={`Hello ${auth?.first_name} ${auth?.last_name}!`}
      logout={() => handleLogout()}
      profileAction={() => handleProfile()}
    >
      <View style={tableStyle.outer}>
        <DataTable style={tableStyle.inner}>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Disaster</DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
            <DataTable.Title>Action</DataTable.Title>
          </DataTable.Header>
          {emergencies?.map((data, index) => (
            <DataTable.Row key={index}>
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
    </Main>
  );
};

ResponderScreen.propTypes = {
  authState: PropTypes.object.isRequired,
  emergenciesState: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  getAllEmergenciesByStatus: PropTypes.func.isRequired,
  getEmergency: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authState,
  emergenciesState: state.emergenciesState,
});

export default connect(mapStateToProps, {
  logoutUser,
  getAllEmergenciesByStatus,
  getEmergency,
})(ResponderScreen);
