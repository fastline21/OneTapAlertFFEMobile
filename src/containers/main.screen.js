import { SafeAreaView, StatusBar, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useState } from 'react';
import { Appbar } from 'react-native-paper';

import containerStyle from '../styles/container.style';
import imageBackgroundStyle from '../styles/image-background.style';

const Main = ({
  children,
  isShowBackgroundImage = false,
  headerTitle = '',
  logout,
  isBackAction = false,
  backAction,
}) => {
  const [contentBottom, setContentBottom] = useState(0);

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
      >
        {headerTitle && (
          <Appbar.Header statusBarHeight={0}>
            {isBackAction ? (
              <Appbar.BackAction onPress={() => backAction()} />
            ) : (
              <Appbar.Action
                icon='account-circle'
                onPress={() => alert('User account')}
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
