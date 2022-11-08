import { Alert, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Main from '../containers/main.screen';
import Loading from '../containers/loading.screen';

import inputTextStyle from '../styles/input-text.style';

import {
  submitRequestBackup,
  requestBackupClearResponse,
} from '../stores/actions/request-backup.action';

const RequestBackupScreen = ({
  navigation,
  requestBackupState: {
    success: requestBackupSuccess,
    error: requestBackupError,
    loading: requestBackupLoading,
    message: requestBackupMessage,
  },
  authState: { auth },
  emergenciesState: { emergency },
  submitRequestBackup,
  requestBackupClearResponse,
}) => {
  const initialFormInput = {
    description: null,
  };
  const [formInput, setFormInput] = useState(initialFormInput);

  const handleBackAction = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    submitRequestBackup({
      user_id: auth.id,
      emergency_id: emergency.id,
      description: formInput.description,
    });

    setFormInput(initialFormInput);
  };

  const handleChangeInput = (name, value) => {
    setFormInput({ ...formInput, [name]: value });
  };

  useEffect(() => {
    if (requestBackupSuccess) {
      Alert.alert('Success', 'You successfully submit a request backup');
      navigation.goBack();
      requestBackupClearResponse();
    }

    if (requestBackupError) {
      Alert.alert('Error', requestBackupMessage);
      requestBackupClearResponse();
    }
  }, [requestBackupSuccess, requestBackupError, requestBackupMessage]);

  if (requestBackupLoading) {
    return <Loading />;
  }

  return (
    <Main
      isBackAction={true}
      headerTitle='Request Backup'
      backAction={() => handleBackAction()}
    >
      <View style={inputTextStyle.outer}>
        <TextInput
          label='Description'
          value={formInput.description}
          onChangeText={(value) => handleChangeInput('description', value)}
          mode='outlined'
          maxLength={100}
          multiline={true}
          numberOfLines={4}
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
  requestBackupState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
  emergenciesState: PropTypes.object.isRequired,
  submitRequestBackup: PropTypes.func.isRequired,
  requestBackupClearResponse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  requestBackupState: state.requestBackupState,
  authState: state.authState,
  emergenciesState: state.emergenciesState,
});

export default connect(mapStateToProps, {
  submitRequestBackup,
  requestBackupClearResponse,
})(RequestBackupScreen);
