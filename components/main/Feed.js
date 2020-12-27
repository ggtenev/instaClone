import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Feed() {
  return (
    <View style={styles.container}>
      <Text> Feed </Text>
     </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white'
  }
})
