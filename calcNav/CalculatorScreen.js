import React from'react';
import {useState, useEffect} from 'react';
import {createStackNavigator} from 'react-navigation-stack'
import {View, Text, Button, TextInput, StyleSheet, Keyboard} from 'react-native';


export default function CalculatorScreen(props){

const{ navigate } = props.navigation;


const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState('');
  const [operator, setOperator] = useState('');
  const [history, setHistory]= useState([]);
  
  useEffect(() => {
    if (result) {
      setHistory([...history, {key: `${number1} ${operator} ${number2} = ${result}`}]);
    }
  }, [result]);


const buttonPressed = (e,calc) => {
    if (calc === '+') setResult(parseInt(number1) + parseInt(number2)+"");
    else if (calc === '-') setResult(parseInt(number1) - parseInt(number2)+"");
    Keyboard.dismiss();
    setOperator(calc);
}

return (
    
  <View style={styles.container}>
     <View style={styles.text}>
    <Text>Result: {result} </Text>
    </View>
    <View style={styles.row}>
    <View style={styles.textInput}>
    <TextInput value={number1} 
    onChangeText={text => setNumber1(text)} 
    style={{textAlign:'left'}} 
    keyboardType={'numeric'}></TextInput>
    </View>
  </View>
  <View style={styles.row}>
    <View style={styles.textInput}>
    <TextInput value={number2} 
    onChangeText={text => setNumber2(text)} 
    style={{textAlign:'left'}} 
    keyboardType={'numeric'}></TextInput>
    </View>
  </View>
  <View style={styles.buttonRow}>
  <Button title="  +  " onPress={(e) => buttonPressed(e,'+')}/>
  <Button title="  -  " onPress={(e) => buttonPressed(e,'-')}/>
  </View>
  <View >
   <Button onPress={() => navigate('HistoryScreen', {history: history} )} title="History"/>
   </View>
</View>
);
} 


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 100,
   
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    calculator: {
      fontSize: 50,
      fontWeight: 'bold',
      marginBottom: 20
    },
    row: {
      flexDirection: 'row',
      marginTop: 5
    },
    text: {
      backgroundColor: 'white',
      justifyContent: 'center',
      padding: 5,
      width:100,
    },
    textInput: {
      backgroundColor: 'white',
      justifyContent: 'center',
      padding: 5,
      borderRadius: 1.0,
      borderWidth: 1,
      width: 200,
      marginLeft: 5,
    }, 
    buttonRow: {
      flexDirection: 'row',
      marginTop: 20,
      marginBottom: 20,
      justifyContent: 'space-around',
      width: 220
    },
  
   
});

