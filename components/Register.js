import React, { Component } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import firebase from "firebase";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
    };

    this.onSignUp = this.onSignUp.bind(this);
  }
  onSignUp() {
    
    const { email, password, name } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid).set({
            name:name
          })
      })
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
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder='Name'
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button title='SIgn Up' onPress={this.onSignUp} />
        <Button
          title='already have an account'
          onPress={() => this.props.navigation.navigate("Login")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: "80%",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
