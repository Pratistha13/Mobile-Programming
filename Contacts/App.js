import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList} from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [contact, setContact] = useState({});

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContact(data);
      }
    }
  }

  const renderItem = ({ item }) => {
    if (item.phoneNumbers) {      
      return (
        <View>
          <Text>
            {item.name}
          </Text>
          <Text>{item.phoneNumbers[0].number}</Text>
        </View> );
      }
  }

  return (
    <View style={styles.container}>
      <View style={styles.contFlat}>
        <Text>Contacts</Text>
        <FlatList
          data={contact}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
        />
      </View>
      <Button title ="Get Contacts" onPress={getContacts} />
      <StatusBar style="auto" />
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
  contFlat: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
