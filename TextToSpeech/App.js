import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
 const[text, setText] = useState('');
 const speak =  Speech.speak (text);

  return (
      <View style={styles.container}>
        <TextInput 
        style={{fontSize: 18}} 
        value = {text}
        keyboardType = "ascii-capable"
        placeholder="Enter text"
        onChangeText={(text) => setText(text)} 
      />
      <Button title="Press to hear some words" onPress={speak} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
