import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Button, Animated } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { getDataAsyncStorage, removeDataAsyncStorage, storeDataAsyncStorage } from "@/utils/AsyncStorage";
import { formatTitleToId } from "@/utils/textUtils";

export default function EventPage() {
  // Get item data from route params and parse it from JSON
  const { item } = useLocalSearchParams();
  const parsedItem = item ? JSON.parse(item as string) : null;

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


  // If there is no parsed item, show an error message
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
      storeDataAsyncStorage(eventTitle, item);
      
      setSubscriptionStatus({
        isSubscribed: true,
        buttonText: "Unsubscribe",
        subscribeText: 'Successfully Subscribed!',
      });

    }; 

    Animated.timing(fadeAnim, {
      toValue: 1, // Fade in
      duration: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0, // Fade out
          duration: 500,
          useNativeDriver: true,
        }).start(() => setShowPopup(false)); // Set to false after animation ends
    }, 3000);
  };
  return (
    <>
      <Stack.Screen
        options={{
          title: parsedItem.title, // Dynamically set the title from parsed item
          headerBackTitle: "Back", // Custom back button title
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
            title={subscriptionStatus.buttonText}
            onPress={() => {
              handleSubscribe();
            }}
          />
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
