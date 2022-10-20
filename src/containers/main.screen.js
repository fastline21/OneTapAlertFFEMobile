import { SafeAreaView, StatusBar } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";

const Main = ({ children }) => {
  const [contentBottom, setContentBottom] = useState(0);

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView
        keyboardOpeningTime={0}
        extraScrollHeight={150}
        enableResetScrollToCoords
        onKeyboardWillHide={() => setContentBottom(0)}
        onKeyboardWillShow={() => setContentBottom(200)}
        contentInset={{ bottom: contentBottom }}
      >
        {children}
      </KeyboardAwareScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Main;
