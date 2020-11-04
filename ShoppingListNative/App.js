import* as SQLite from 'expo-sqlite';
import React, {useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Keyboard, FlatList } from 'react-native';
import{ Header, Icon, Input, Button, ListItem } from'react-native-elements';
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
  renderItem =  ({item}) => (
    <ListItem
      title={item.product}
      subtitle={item.amount}
      rightElement={"bought"}
      onLongPress={() => deleteItem(item.id)}
    />
  
  )
  return (
    <View style={styles.container}>
      <Header
        containerStyle={{ backgroundColor: "blue" }}
        centerComponent={{ text: "SHOPPING LIST", style: { color: "#fff", fontSize: 20 } }}
      />
      <Input  placeholder="Product"  containerStyle={{ marginTop: 10,fontSize: 18}}
        onChangeText={(product) => setProduct(product)}
        value={product}
      />

      <Input  placeholder="Amount"  containerStyle={{marginTop: 10,  marginBottom: 10, fontSize: 18 }}
        onChangeText={(amount) => setAmount(amount)}
        value={amount}
      />
      <Button icon  ={{name: 'save'}} onPress={saveItem} title="SAVE"/>
      <FlatList 
        data={shoppingList}
        style={{width: 150}}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={listSeparator}
      />      
    </View>
  );

  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});