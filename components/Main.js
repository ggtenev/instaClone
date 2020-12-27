import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons,AntDesign } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const Tab = createMaterialBottomTabNavigator();

const Empty = () => {
  return null
}

import Feed from "./main/Feed";
import Profile from "./main/Profile";


import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions/index";

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    const { currentUser } = this.props;
    console.log(currentUser);
    if (!currentUser) {
      return (
        <View>
          <Text>egdehejeegege</Text>
        </View>
      );
    }
    return (
      <Tab.Navigator
        labeled={false}
        barStyle={{ backgroundColor: '#694fad' }}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",

          //Make the tab bar transparent !!!!
          // style: {
          //   backgroundColor:'transparent',
          //   borderWidth: 0,
          //   position: 'absolute',
          //  elevation:0 // <-- this is the solution
          // },
          labelStyle:{
            fontSize:13
          }
        }}
      >
        <Tab.Screen
          name='Feed'
          component={Feed}
          options={{
            tabBarIcon: ({ color, size }) => {
            return  <Ionicons name='md-home' size={26} color={color} />;
            },
          }}
        />
        <Tab.Screen
       listeners={({navigation}) => ({
         tabPress:event => {
           event.preventDefault()
           navigation.navigate('Add')
         }
       })

       }
          name='MainAdd'
          component={Empty}
          options={{
            tabBarIcon: ({ color, size }) => {
            return (
         
              <AntDesign name="plus" size={24} color={color} />
          
            )  
            },
          }}
        />
        <Tab.Screen
          name='Profile'
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => {
            return  <Ionicons name="md-person" size={29} color={color} />;
            },
          }}
        />
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    currentUser: store.userState.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
