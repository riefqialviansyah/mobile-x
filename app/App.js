import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";

// import screen
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import HomeScreen from "./Screens/HomeScreen";

// import apolloContex
import { AuthContex } from "./helpers/authContex";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLogin, setIslogin] = useState(false);

  return (
    <AuthContex.Provider value={{ isLogin, setIslogin }}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Login"
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </AuthContex.Provider>
  );
}
