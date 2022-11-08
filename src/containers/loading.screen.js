import { SafeAreaView, Image } from 'react-native';

import logoStyle from '../styles/logo.style';

import loading from '../../assets/loading.gif';

const Loading = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image style={logoStyle.inner} fadeDuration={1000} source={loading} />
    </SafeAreaView>
  );
};

export default Loading;
