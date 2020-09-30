import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';

export default function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState([]);

  const getRecipe = () => {
    const url = 'http://www.recipepuppy.com/api/?i='+ ingredients;
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => { 
       setRecipe(responseJson.results);
    })
    .catch((error) => { 
      Alert.alert('Error' , error); 
    }); 
  }
  
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text>{ingredients}</Text>
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={item => item.title} 
        data={recipe}
        renderItem={({item}) => 
        <View>
          <Text>{item.title}</Text>
          <Image
              style={{ width: 70, height: 70 }}
              source={{ uri: item.thumbnail }}
            />
        </View>}      
      />  
      <TextInput 
        style={{fontSize: 18}} 
        value={ingredients}
        keyboardType = "ascii-capable"
        placeholder="Enter ingredients"
        onChangeText={(ingredients) => setIngredients(ingredients)} 
      />

     <Button title="Find" onPress={getRecipe} />
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