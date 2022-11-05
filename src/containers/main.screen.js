import {
  SafeAreaView,
  StatusBar,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useState, useCallback } from 'react';
import { Appbar } from 'react-native-paper';

import containerStyle from '../styles/container.style';
import imageBackgroundStyle from '../styles/image-background.style';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Main = ({
  children,
  isShowBackgroundImage = false,
  headerTitle = '',
  logout,
  isBackAction = false,
  backAction,
  profileAction,
  isRefresh = false,
  getDataOnRefresh,
}) => {
  const [contentBottom, setContentBottom] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getDataOnRefresh();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={containerStyle}>
      {isShowBackgroundImage && (
        <ImageBackground
          source={require('../../assets/background.png')}
          style={imageBackgroundStyle}
        />
      )}
      <KeyboardAwareScrollView
        keyboardOpeningTime={0}
        extraScrollHeight={150}
        enableResetScrollToCoords
        onKeyboardWillHide={() => setContentBottom(0)}
        onKeyboardWillShow={() => setContentBottom(200)}
        contentInset={{ bottom: contentBottom }}
        refreshControl={
          isRefresh && (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          )
        }
      >
        {headerTitle && (
          <Appbar.Header statusBarHeight={0}>
            {isBackAction ? (
              <Appbar.BackAction onPress={() => backAction()} />
            ) : (
              <Appbar.Action
                icon='account-circle'
                onPress={() => profileAction()}
              />
            )}

            <Appbar.Content title={headerTitle} />
            <Appbar.Action icon='logout' onPress={() => logout()} />
          </Appbar.Header>
        )}
        {children}
      </KeyboardAwareScrollView>
      <StatusBar style='light' />
    </SafeAreaView>
  );
};

export default Main;
