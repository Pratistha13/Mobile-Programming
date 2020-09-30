import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Button, Alert, View} from 'react-native';
import {Picker} from '@react-native-community/picker';

export default function App() {
  const [rates, setRates] = useState([]);
  const [amount, setAmount]= useState('');
  const [currency, setCurrency] = useState('');
  const [result, setResult] = useState(0);

  
  const getData = () => {
    const url = 'https://api.exchangeratesapi.io/latest';
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => { 
       setRates(responseJson.rates);
    })
    .catch((error) => { 
      Alert.alert('Error' , error); 
    }); 
  }
  useEffect(()=>
  getData(),
  []);
  const getConversion=()=>{
    const rate = rates[currency];
    setResult((amount/rate).toFixed(2))
  }



  return (
    <View style={styles.container}>
      <Text style = {{fontSize: 20}}>{result} €</Text>
      <View style ={styles.textinput}>
      <TextInput 
        style={{fontSize: 18, width: 120, marginTop:40}} 
        keyboardType = "numeric"
        placeholder="Enter amount"
        onChangeText={(amount) => setAmount(amount)} 
      />
      <Picker style ={{heigth:30, width: 100, marginTop: 40}}
          selectedValue={currency}
          onValueChange={value => setCurrency(value)}>
          {
          Object.keys(rates).map((item, index) =>
              <Picker.Item key={index} label={item} value={item} />)
          }
        </Picker>
      </View>

     <Button title="Convert" onPress={getConversion} />
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  
 },
 textinput :{
   flexDirection: 'row',
   borderColor: 'black',
 },
});

