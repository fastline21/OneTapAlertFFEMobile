import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button, Alert } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

import Main from '../containers/main.screen';
import Loading from '../containers/loading.screen';

import { logoutUser } from '../stores/actions/auth.action';
import {
  upgradeUserType,
  usersClearResponse,
} from '../stores/actions/users.action';

import inputTextStyle from '../styles/input-text.style';

import { USER_TYPES } from '../constants/user-types';
import { USER_STATUSES } from '../constants/user-statuses';

const UpgradeAccountScreen = ({
  navigation,
  authState: { auth },
  usersState: {
    loading: usersLoading,
    success: usersSuccess,
    error: usersError,
    message: usersMessage,
  },
  logoutUser,
  upgradeUserType,
  usersClearResponse,
}) => {
  useEffect(() => {
    if (!auth) {
      navigation.navigate('Login');
    }
  }, [auth]);

  const initialFormInput = {
    userTypeID: 0,
  };
  const [formInput, setFormInput] = useState(initialFormInput);

  const handleLogout = () => {
    logoutUser();
  };

  const handleProfile = () => {
    navigation.push('Profile');
  };

  const renderUserTypes = () => {
    const render = [];
    for (const [key, value] of Object.entries(USER_TYPES)) {
      const currentUserType = auth.user_type.name.toUpperCase();
      if (key !== currentUserType && value !== USER_TYPES.ADMIN) {
        render.push(<Picker.Item key={value} label={key} value={value} />);
      }
    }

    return render;
  };

  const handleChangeInput = (name, value) => {
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = () => {
    upgradeUserType({
      userID: auth.id,
      user_status_id: USER_STATUSES.PENDING,
      ...formInput,
    });
  };

  useEffect(() => {
    if (usersSuccess) {
      Alert.alert(
        'You successfully upgrade your account. Please wait up to 7 days to approve your request.'
      );

      usersClearResponse();
    }

    if (usersError) {
      Alert.alert('Error', usersMessage);

      usersClearResponse();
    }
  }, [usersSuccess, usersError, usersMessage]);

  if (usersLoading) {
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
      <View style={inputTextStyle.outer}>
        <Text style={{ marginHorizontal: 10 }}>User Type</Text>
        <Picker
          selectedValue={formInput.userTypeID}
          onValueChange={(itemValue, itemIndex) =>
            handleChangeInput('userTypeID', itemValue)
          }
        >
          {renderUserTypes()}
        </Picker>
      </View>
      <View
        style={{
          marginHorizontal: 10,
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
      >
        <Button mode='contained' onPress={() => handleSubmit()}>
          Submit
        </Button>
      </View>
    </Main>
  );
};

UpgradeAccountScreen.propTypes = {
  authState: PropTypes.object.isRequired,
  usersState: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  upgradeUserType: PropTypes.func.isRequired,
  usersClearResponse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authState,
  usersState: state.usersState,
});

export default connect(mapStateToProps, {
  logoutUser,
  upgradeUserType,
  usersClearResponse,
})(UpgradeAccountScreen);
