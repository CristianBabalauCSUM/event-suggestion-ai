import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

export default function EventPage() {
  // Get item data from route params and parse it from JSON
  const { item } = useLocalSearchParams();
  const parsedItem = item ? JSON.parse(item as string) : null;

  if (!parsedItem) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No event data available.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: parsedItem.title,     // Dynamically set the title from parsed item
          headerBackTitle: 'Back',     // Custom back button title
        }}
      />

      <View style={styles.container}>
        <Image source={parsedItem.image} style={styles.image} />
        <Text style={styles.title}>{parsedItem.title}</Text>
        <Text style={styles.description}>{parsedItem.description}</Text>
        <Text style={styles.time}>{parsedItem.time}</Text>
        <Text style={styles.location}>Location: {parsedItem.location}</Text>

        {/* Subscribe Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Subscribe"
            onPress={() => {
              console.log('User subscribed to the event');
            }}
          />
        </View>
      </View>
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
});
