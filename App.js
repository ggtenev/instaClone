import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers/index";
import thunk from "redux-thunk";

import firebase from "firebase";

import Main from "./components/Main";
import Add from "./components/main/Add";

const store = createStore(rootReducer, applyMiddleware(thunk));

var firebaseConfig = {
  apiKey: "AIzaSyAOGndA-0M0-VDeJq9KnQhA9sxsMF8-w68",
  authDomain: "instaclone-371b2.firebaseapp.com",
  projectId: "instaclone-371b2",
  storageBucket: "instaclone-371b2.appspot.com",
  messagingSenderId: "108275895500",
  appId: "1:108275895500:web:af10dda3f99b7726f2c669",
};
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import Landing from "./components/Landing";
import Register from "./components/Register";
import Login from "./components/Login";

const Stack = createStackNavigator();

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoaded(true);
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
        setLoaded(true);
      }
    });
  }, []);

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color='blue' size='large' />
      </View>
    );
  }

  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Landing'
          screenOptions={{
            headerTitleAlign: "center",
            headerShown: false,
          }}
        >
          <Stack.Screen name='Landing' component={Landing} />
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

 if(loggedIn) return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator
     
          screenOptions={{
            headerTitleAlign: "center",
            headerShown: false,
          }}
        >
          <Stack.Screen name='Main' component={Main} />
          <Stack.Screen name='Add' component={Add} />
          
        </Stack.Navigator>
      </NavigationContainer>

    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
