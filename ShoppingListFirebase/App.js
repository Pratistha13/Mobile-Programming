import* as firebase from 'firebase';
import React, {useState, useEffect }  from 'react';
import { StyleSheet, Text, View,TextInput,Button, Keyboard, FlatList } from 'react-native';

//Initializing firebase
const firebaseConfig = {
  apiKey: "AIzaSyDYMME88uyluR2_Drt8iwuA0oupOLybkGs",
  authDomain: "shoppinglistfirebase-d4774.firebaseapp.com",
  databaseURL: "https://shoppinglistfirebase-d4774.firebaseio.com",
  projectId: "shoppinglistfirebase-d4774",
  storageBucket: "shoppinglistfirebase-d4774.appspot.com",
  messagingSenderId: "83251437570",
  appId: "1:83251437570:web:26cc994328fc488ce4071b"
};

firebase.initializeApp(firebaseConfig);

export default function App() {
  
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [shoppingList, setShoppingList] = useState([]);
  
  useEffect(() => {
    firebase.database().ref  ('shoppingList/'). on(
      'value',  snapshot=>  {
      const data=  snapshot.val();
      const prods=  Object.values(data);
      setShoppingList(prods);});
    }, []);

  const saveItem= () =>{
    firebase.database(). ref ('shoppingList/').push(
    {'product': product,  'amount': amount});
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
      keyExtractor={(item, index) => index.toString()} 
      renderItem={({item}) => 
      <View style={styles.listcontainer}>
        <Text style={{fontSize: 18}}>{item.product}, {item.amount}</Text>
      </View>} 
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