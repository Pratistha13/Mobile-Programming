import React, { useState } from "react";
import { Alert, StyleSheet,  View, Button, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const [region, setRegion] = useState({lat: 60.200692,long: 24.934302});
  const [location, setLocation] = useState('');

  const apiKey = "0BYBveAr5zGTfgsfUFNxf1rt6QEjrN2B";
  const getLocation = () => {
    const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&inFormat=kvp&outFormat=json&street=${location}+13%2C+Helsinki%2C+Finland&thumbMaps=false`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        setRegion({
          lat: responseJson.results[0].locations[0].latLng.lat,
          long: responseJson.results[0].locations[0].latLng.lng     
        });      
      })
      .catch(error => {
        Alert.alert("Error", error);
      });
  };

  return (
    <View style={styles.container}>
     <MapView style={{ height: "100%", flex: 2 }}
        region={{
          latitude: region.lat,
          longitude: region.long,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        }}
      >
        <Marker
          coordinate={{ latitude: region.lat, longitude: region.long }}
          title={location}
        />
      </MapView>

      <TextInput
        style={{ fontSize: 18 }}
        value={location}
        keyboardType = "ascii-capable"
        placeholder="enter location"
        onChangeText={(location) => setLocation(location)}
      />

      <Button title="SHOW" 
        onPress = {getLocation}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});