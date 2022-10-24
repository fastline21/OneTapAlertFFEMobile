import { View, Text, Image, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { USER_TYPES } from '../constants/user-types';

import Main from '../containers/main.screen';
import Loading from '../containers/loading.screen';

import logoStyle from '../styles/logo.style';
import inputTextStyle from '../styles/input-text.style';

import {
  loginUser,
  authClearResponse,
  setAuthError,
  authUser,
} from '../stores/actions/auth.action';

import { getToken, removeToken } from '../utilities/token';

const LoginScreen = ({
  navigation,
  authState: {
    auth,
    loading: authLoading,
    success: authSuccess,
    error: authError,
    message: authMessage,
  },
  authClearResponse,
  loginUser,
  setAuthError,
  authUser,
}) => {
  const handleAuthUser = async () => {
    const isToken = await getToken('auth_token');

    if (isToken) {
      authUser();
    }
  };

  useEffect(() => {
    handleAuthUser();
  }, []);

  const initialFormInput = {
    username: null,
    password: null,
  };

  const [formInput, setFormInput] = useState(initialFormInput);

  const handleChangeInput = (name, value) => {
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = () => {
    const { username, password } = formInput;

    if (!username || !password) {
      setAuthError('Please fill out all required fields');
      return;
    }

    loginUser({
      ...formInput,
      user_type_ids: [USER_TYPES.RESIDENT, USER_TYPES.RESPONDER],
    });
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  useEffect(() => {
    if (authSuccess) {
      if (auth.user_type_id === USER_TYPES.RESIDENT) {
        navigation.navigate('Resident');
      }
      authClearResponse();
    }

    if (authError) {
      if (authMessage === 'Entry Not Found') {
        Alert.alert('Error', 'User does not exist');
      } else {
        Alert.alert('Error', authMessage);
      }

      authClearResponse();
      removeToken('auth_token');
    }
  }, [authSuccess, authError, authMessage, auth]);

  if (authLoading) {
    return <Loading />;
  }

  return (
    <Main isShowBackgroundImage={true}>
      <View style={[logoStyle.outer, { paddingTop: 100 }]}>
        <Image
          source={require('../../assets/logo.png')}
          fadeDuration={1000}
          style={logoStyle.inner}
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          label='Username'
          value={formInput.username}
          onChangeText={(value) => handleChangeInput('username', value)}
          mode='outlined'
          maxLength={12}
          autoCapitalize='none'
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          label='Password'
          value={formInput.password}
          onChangeText={(value) => handleChangeInput('password', value)}
          mode='outlined'
          maxLength={12}
          secureTextEntry={true}
          autoCapitalize='none'
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
          <Button onPress={handleSubmit} mode='contained'>
            Login
          </Button>
        </View>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <Text>
          You don't have any account?{' '}
          <Text style={{ color: 'blue' }} onPress={() => handleRegister()}>
            Register
          </Text>
        </Text>
      </View>
    </Main>
  );
};

LoginScreen.propTypes = {
  authState: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  authClearResponse: PropTypes.func.isRequired,
  setAuthError: PropTypes.func.isRequired,
  authUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authState,
});

export default connect(mapStateToProps, {
  loginUser,
  authClearResponse,
  setAuthError,
  authUser,
})(LoginScreen);
