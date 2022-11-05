import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import configureStore from './configureStore';

const Stack = createNativeStackNavigator();

import HomeScreen from './src/screens/home.screen';
import RegisterScreen from './src/screens/register.screen';
import LoginScreen from './src/screens/login.screen';
import ResidentScreen from './src/screens/resident.screen';
import EmergencyProofScreen from './src/screens/emergency-proof.screen';
import ResponderScreen from './src/screens/responder.screen';
import ViewEmergencyScreen from './src/screens/view-emergency.screen';
import MapScreen from './src/screens/map.screen';
import IncidentReportScreen from './src/screens/incident-report.screen';
import RequestBackupScreen from './src/screens/request-backup.screen';
import ProfileScreen from './src/screens/profile.screen';
import UpgradeAccountScreen from './src/screens/upgrade-account.screen';

const App = () => {
  return (
    <StoreProvider store={configureStore}>
      <PaperProvider theme={{ dark: false }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name='Login'
              component={LoginScreen}
              options={{ title: 'Login Resident/Responder' }}
            />
            <Stack.Screen
              name='Register'
              component={RegisterScreen}
              options={{ title: 'Register User' }}
            />
            <Stack.Screen name='Resident' component={ResidentScreen} />
            <Stack.Screen
              name='EmergencyProof'
              component={EmergencyProofScreen}
            />
            <Stack.Screen name='Responder' component={ResponderScreen} />
            <Stack.Screen
              name='ViewEmergency'
              component={ViewEmergencyScreen}
            />
            <Stack.Screen name='Map' component={MapScreen} />
            <Stack.Screen
              name='IncidentReport'
              component={IncidentReportScreen}
            />
            <Stack.Screen
              name='RequestBackup'
              component={RequestBackupScreen}
            />
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen
              name='UpgradeAccount'
              component={UpgradeAccountScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
