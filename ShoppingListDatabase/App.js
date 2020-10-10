import { StatusBar } from 'expo-status-bar';
import* as SQLite from 'expo-sqlite';
import React, {useState, useEffect }  from 'react';
import { StyleSheet, Text, View,TextInput,Button, Keyboard, FlatList } from 'react-native';
const db = SQLite.openDatabase('shoppingdb.db');

export default function App() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [shoppingList, setShoppingList] = useState([]);
  
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shopping (id integer primary key not null, product text, amount text);');
    });
    updateList();    
  }, []);

  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into shopping (product, amount) values (?, ?);', [product, amount]);    
      }, null, updateList
    )
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shopping;', [], (_, { rows }) =>
        setShoppingList(rows._array)
      ); 
    });
  }
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from shopping where id = ?;`, [id]);
      }, null, updateList
    )    
  }
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };



  return (
    <View style={styles.container}>
    <TextInput placeholder='Product' style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
      onChangeText={(product) => setProduct(product)}
      value={product}/>  
    <TextInput placeholder='Amount' style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
      onChangeText={(amount) => setAmount(amount)}
      value={amount}/>      
    <Button onPress={saveItem} title="Save" /> 
    <Text style={{marginTop: 30, fontSize: 20}}>Shopping List</Text>
    <FlatList 
      style={{marginLeft : "5%"}}
      keyExtractor={item => item.id.toString()} 
      renderItem={({item}) => <View style={styles.listcontainer}><Text style={{fontSize: 18}}>{item.product}, {item.amount}</Text>
      <Text style={{fontSize: 18, color: '#0000ff'}} onPress={() => deleteItem(item.id)}> Bought </Text></View>} 
      data={shoppingList} 
      ItemSeparatorComponent={listSeparator} 
    />      
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
  listcontainer: {
   flexDirection: 'row',
   backgroundColor: '#fff',
   alignItems: 'center'
  },
 });