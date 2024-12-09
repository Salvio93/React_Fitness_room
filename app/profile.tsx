import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const initialData = {
  body: {
    name: 'info',
    height: 176,
    weight: 66,
    age: 22,
    genre: 'H',
  },
};

export default function TabThreeScreen() {
  const [jsonData, setJsonData] = useState(initialData.body);

  const handleSave = () => {
    Alert.alert('Success', 'Parameters updated successfully');
    console.log('Updated JSON:', JSON.stringify({ body: jsonData }, null, 2));
  };

  const handleInputChange = (key, value) => {
    setJsonData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="person" style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Profile</ThemedText>
      </ThemedView>

      <Collapsible title="Personal data">
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Données perso</ThemedText>
        <ThemedText>
          height : <ThemedText type="defaultSemiItalic">{jsonData.height} cm </ThemedText> {'         '}
          weight : <ThemedText type="defaultSemiItalic">{jsonData.weight} kg </ThemedText>
        </ThemedText>

        <ThemedText>
          age : <ThemedText type="defaultSemiItalic">{jsonData.age}</ThemedText>{'                 '}
          genre : <ThemedText type="defaultSemiItalic">{jsonData.genre}</ThemedText>
        </ThemedText>

      </ThemedView>
      </Collapsible>

      <Collapsible title="Parameters">
        <ThemedView>
          <ThemedText>Modify Parameters</ThemedText>

          <View style={styles.inputContainer}>
           

            <ThemedText>Height (cm)</ThemedText>
            <TextInput
              style={styles.input}
              value={jsonData.height.toString()}
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('height', parseInt(value) || 0)}
            />

            <ThemedText>Weight (kg)</ThemedText>
            <TextInput
              style={styles.input}
              value={jsonData.weight.toString()}
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('weight', parseInt(value) || 0)}
            />

            <ThemedText>Age</ThemedText>
            <TextInput
              style={styles.input}
              value={jsonData.age.toString()}
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('age', parseInt(value) || 0)}
            />

            <ThemedText>Genre</ThemedText>
            <TextInput
              style={styles.input}
              value={jsonData.genre}
              onChangeText={(value) => handleInputChange('genre', value)}
            />
          </View>

          <Button title="Save Changes" onPress={handleSave} />
        </ThemedView>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  inputContainer: {
    marginTop: 10,
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginVertical: 5,
    color: '#999999',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
