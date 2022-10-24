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
          <Appbar.Header mode='center-aligned' statusBarHeight={0}>
            <Appbar.Content title={headerTitle} />
          </Appbar.Header>
        )}
        {children}
      </KeyboardAwareScrollView>
      <StatusBar style='light' />
    </SafeAreaView>
  );
};

export default Main;
