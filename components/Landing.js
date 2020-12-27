import React from 'react';
import { View, Text , StyleSheet, Button} from 'react-native';

export default function Landing({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={{marginVertical:20, fontSize:33, fontWeight:'bold'}}>Welcome to the Insta Clone</Text>
      <Button onPress={() => navigation.navigate('Register')} title='Register'/>
      <Button onPress={() => navigation.navigate('Login')} title='Login'/>
     </View>
  );
}

const styles  = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white'
  }
})