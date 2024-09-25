import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Button, Animated, TouchableOpacity } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { getDataAsyncStorage, removeDataAsyncStorage, storeDataAsyncStorage } from "@/lib/utils/AsyncStorage";
import { formatTitleToId } from "@/lib/utils/textUtils";
import { ThemedText } from "@/components/ThemedText";
import { EventData } from "@/lib/definitions";

export default function EventPage() {
  const { item } : { item : string } = useLocalSearchParams();

  const parsedItem = JSON.parse(item) as EventData;
  const eventTitle = formatTitleToId(parsedItem.title);


  const [showPopup, setShowPopup] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity of 0
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    isSubscribed: false,
    buttonText: 'Subscribe',
    subscribeText: 'Successfully Subscribed!',
  });


  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        const isSubscribed = await getDataAsyncStorage(eventTitle);
        if (isSubscribed ) {
          setSubscriptionStatus({
            isSubscribed: true,
            buttonText: 'Unsubscribe',
            subscribeText: 'You are already subscribed!',
          });

        }
      } catch (error) {
        console.error('Error checking subscription status', error);
      }
    };

    checkSubscriptionStatus();
  }, []); // Empty dependency array means this effect runs once when the component mounts


  if (!parsedItem) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No event data available.</Text>
      </View>
    );
  }

  const handleSubscribe = () => {
    setShowPopup(true);

    if (subscriptionStatus.isSubscribed) {
      removeDataAsyncStorage(eventTitle);
      setSubscriptionStatus({
        isSubscribed: false,
        buttonText: "Subscribe",
        subscribeText: 'Successfully Unsubscribed!',
      });

    } else {
      console.log('Subscribed to event:', parsedItem);
      storeDataAsyncStorage(eventTitle, parsedItem);
      
      setSubscriptionStatus({
        isSubscribed: true,
        buttonText: "Unsubscribe",
        subscribeText: 'Successfully Subscribed!',
      });

    }; 

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setShowPopup(false)); 
    }, 3000);
  };
  return (
    <>
      <Stack.Screen
        options={{
          title: parsedItem.title,
          headerBackTitle: "Back", 
        }}
      />

      <View style={styles.container}>
        <Image source={parsedItem.image} style={styles.image} />
        <ThemedText style={styles.title}>{parsedItem.title}</ThemedText>
        <ThemedText style={styles.description}>{parsedItem.description}</ThemedText>
        <ThemedText style={styles.time}>{parsedItem.time}</ThemedText>
        <ThemedText style={styles.location}>Location: {parsedItem.location}</ThemedText>

        {/* Subscribe Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{ backgroundColor: "#F7B538", padding: 10, borderRadius: 5, alignItems: "center" }}
            onPress={() => {
              handleSubscribe();
            }}
          >
            <ThemedText>{subscriptionStatus.buttonText}</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Animated Popup */}
      {showPopup && (
        <Animated.View style={[styles.popup, { opacity: fadeAnim }]}>
          <Text style={styles.popupText}>{subscriptionStatus.subscribeText}</Text>
        </Animated.View>
      )}
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  time: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 50,
  },
  // Popup styles
  popup: {
    position: "absolute",
    bottom: 100,
    left: "10%",
    right: "10%",
    padding: 20,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Adds a shadow (Android)
    shadowColor: "#000", // Shadow color (iOS)
    shadowOffset: { width: 0, height: 2 }, // Shadow position (iOS)
    shadowOpacity: 0.3, // Shadow opacity (iOS)
    shadowRadius: 3, // Shadow blur radius (iOS)
  },
  popupText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
