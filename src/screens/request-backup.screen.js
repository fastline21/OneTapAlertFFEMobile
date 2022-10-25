import { Alert, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Main from '../containers/main.screen';
import Loading from '../containers/loading.screen';

import inputTextStyle from '../styles/input-text.style';

import {
  submitIncidentReport,
  incidentReportsClearResponse,
} from '../stores/actions/incident-reports.action';

const RequestBackupScreen = ({
  navigation,
  incidentReportsState: {
    success: incidentReportsSuccess,
    error: incidentReportsError,
    loading: incidentReportsLoading,
    message: incidentReportsMessage,
  },
  authState: { auth },
  emergenciesState: { emergency },
  submitIncidentReport,
  incidentReportsClearResponse,
}) => {
  const initialFormInput = {
    noOfDeath: 0,
    noOfCasualties: 0,
    noOfHouseAffected: 0,
  };
  const [formInput, setFormInput] = useState(initialFormInput);

  const handleBackAction = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    submitIncidentReport({
      user_id: auth.id,
      emergency_id: emergency.id,
      no_of_death: formInput.noOfDeath,
      no_of_casualties: formInput.noOfCasualties,
      no_of_house_affected: formInput.noOfHouseAffected,
    });

    setFormInput(initialFormInput);
  };

  const handleChangeInput = (name, value) => {
    setFormInput({ ...formInput, [name]: value });
  };

  useEffect(() => {
    if (incidentReportsSuccess) {
      Alert.alert('Success', 'You successfully submit an incident report');
      navigation.navigate('Responder');
      incidentReportsClearResponse();
    }

    if (incidentReportsError) {
      Alert.alert('Error', incidentReportsMessage);
      incidentReportsClearResponse();
    }
  }, [incidentReportsSuccess, incidentReportsError, incidentReportsMessage]);

  if (incidentReportsLoading) {
    return <Loading />;
  }

  return (
    <Main
      isBackAction={true}
      headerTitle='Incident report'
      backAction={() => handleBackAction()}
    >
      <View style={inputTextStyle.outer}>
        <TextInput
          label='No of Death'
          value={formInput.noOfDeath}
          onChangeText={(value) => handleChangeInput('noOfDeath', value)}
          mode='outlined'
          maxLength={50}
          keyboardType='numeric'
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          label='No of Casualties'
          value={formInput.noOfCasualties}
          onChangeText={(value) => handleChangeInput('noOfCasualties', value)}
          mode='outlined'
          maxLength={50}
          keyboardType='numeric'
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          label='No of House Affected'
          value={formInput.noOfHouseAffected}
          onChangeText={(value) =>
            handleChangeInput('noOfHouseAffected', value)
          }
          mode='outlined'
          maxLength={50}
          keyboardType='numeric'
        />
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
          <Button onPress={() => handleSubmit()} mode='contained'>
            Submit
          </Button>
        </View>
      </View>
    </Main>
  );
};

RequestBackupScreen.propTypes = {
  incidentReportsState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
  emergenciesState: PropTypes.object.isRequired,
  submitIncidentReport: PropTypes.func.isRequired,
  incidentReportsClearResponse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  incidentReportsState: state.incidentReportsState,
  authState: state.authState,
  emergenciesState: state.emergenciesState,
});

export default connect(mapStateToProps, {
  submitIncidentReport,
  incidentReportsClearResponse,
})(RequestBackupScreen);
