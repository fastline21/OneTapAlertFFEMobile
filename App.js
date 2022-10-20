import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import configureStore from "./configureStore";

const Stack = createNativeStackNavigator();

import HomeScreen from "./src/screens/home.screen";
import RegisterScreen from "./src/screens/register.screen";

const App = () => {
  return (
    <StoreProvider store={configureStore}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: "Register User" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
