import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [num, setNum] = React.useState('');
  const [randNumber, setRandNumber]= React.useState(Math.floor(Math .random() * 100) + 1);
  const [message, setMessage] = React.useState('');
  const [count, setCount] = useState(0);

  const buttonPressed= (number)=>{
    
  if (parseInt(number) < randNumber) setMessage(`Your guess ${num} is too low`), setCount(count+1), setNum('');
  else if (parseInt(number) > randNumber) setMessage(`Your guess ${num} is too high`), setCount(count+1), setNum('');
  else if (parseInt(number) == randNumber) setMessage(Alert.alert(`You guessed the number in ${count} guesses`)), setCount(1), 
  setNum(''), setRandNumber(Math.floor(Math.random() * 100) + 1);
  }
  return (
    <View style={styles.container}>
      <Text>Guess a number between 1 -100</Text>
      <Text>{message}</Text>
      <View style={styles.inputText}>
      <TextInput
              keyboardType='number-pad' 
              onChangeText={(num) => setNum(num)}
              value={num}
            />
      </View>
      <View style ={styles.button}  >
      <Button title="Make Guess"
        onPress={() => buttonPressed(num)}
      />  
      </View>
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
  inputText: {
    fontSize: 30,
    width: 60,
    backgroundColor: 'white',
    color:'black',
    borderColor: 'black',
    borderWidth: 1,
    textAlign: "left",
  },
  button:{
    padding :10,

  }
});
