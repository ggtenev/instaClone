import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button } from 'react-native'

import firebase from "firebase";

export default class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      email:'',
      password:'',
    
    }
  }
  onSignUp() {
    const { email, password, name } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email,password)
      .then((result) => console.log(result))
      .catch((e) => console.log(e));

    this.setState({
      email: "",
      password: "",
      name: "",
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>
        <TextInput 
        style={styles.input}
        placeholder='Email'
        onChangeText = {(email) => this.setState({email})}
        />
        <TextInput 
        style={styles.input}
        placeholder='Password'
        secureTextEntry={true}
        onChangeText = {(password) => this.setState({password})}
        />
         <Button title='Sign In' onPress={this.onSignUp} />
         <Button title='No account yet' onPress={() => this.props.navigation.navigate('Register')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input:{
    width:'80%',
    borderBottomColor:'grey',
    borderBottomWidth:1,
    marginVertical:10
  },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  title:{
    fontSize:32,
    fontWeight:'bold'
  }
})
