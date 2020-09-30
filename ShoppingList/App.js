import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect }  from 'react';
import { StyleSheet, Text, View,TextInput,Button, Keyboard, FlatList } from 'react-native';

export default function App() {
  const [list, setList] = useState ('');
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState('');

  const buttonPressed = (e,calc) => {
    if (calc === 'Add') setResult(list);
    else if (calc === 'Clear') setHistory('');
    Keyboard.dismiss();
  }
  useEffect(() => {
    if (result) {
      setHistory([...history, {key: `${list}`}]);
    }
  }, [result]);


  return (
      <View style={styles.container}>
      <View style={styles.row}>
      <View style={styles.textInput}>
      <TextInput value={list} 
      onChangeText={text => setList(text)} 
      style={{textAlign:'left'}} 
      keyboardType={'alpha-numeric'}></TextInput>
      </View>
    </View>
    <View style={styles.buttonRow}>
    <Button title="  Add  " onPress={(e) => buttonPressed(e,'Add')}/>
    <Button title="  Clear " onPress={(e) => buttonPressed(e,'Clear')}/>
    </View>
    <Text style ={styles.text1}>Shopping List</Text>
    <View style={styles.history}>      
        <FlatList
          style={styles.historyList}
          data={ history }
          renderItem={ ({item}) => 
            <Text style={styles.historyText}>{ item.key }</Text>}
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
  row: {
    flexDirection: 'row',
    marginTop: 70
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
  history: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  historyList: {
    flex:1,
    paddingStart: 125,
    alignContent: 'center',
  },
  historyText: {
    color:'black',
    fontSize: 20,
  },
  text1:{
    color:'blue'
  }
});
