import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState, useEffect, memo } from "react";
import { getAllItemsAsync } from "@/utils/AsyncStorage";
import { router, useFocusEffect } from "expo-router";
import React from "react";

// Memoized EventItem component
const EventItem = memo(({ item }: any) => {
  const newItem = JSON.parse(item.value);
  if (!item || !item.value) return null; // Handle missing item or value
  const { title, image, date, time, location } = newItem;

  return (
    <TouchableOpacity
      style={styles.eventContainer}
      onPress={() => {
        router.push({
          pathname: `/(events)/eventpage`,
          params: { item: JSON.stringify(item) }, // Serialize the item
        });
        console.log("Event clicked:", title);
      }}
    >
      <Image source={image} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{title}</Text>
        <Text style={styles.eventTimeDate}>
          {date} | {time}
        </Text>
        <Text style={styles.eventLocation}>{location}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default function TabTwoScreen() {
  const [allItems, setAllItems] = useState<any>([]);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        const items = await getAllItemsAsync();
        if (items) {
          const parsedItems = items.map(([key, value]) => {
            if (value) {
              try {
                return { key, value: JSON.parse(value) };
              } catch (error) {
                console.error("Error parsing JSON:", error);
                return { key, value: {} };
              }
            } else {
              console.warn("Value is undefined or null for key:", key);
              return { key, value: {} };
            }
          });
          setAllItems(parsedItems);
        } else {
          console.warn("No items found");
          setAllItems([]);
        }
      }
      fetchData();
    }, [])
  );

  return (
    <>
      <SafeAreaView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Your Events</ThemedText>
        </ThemedView>
        <ThemedText>These are all your events</ThemedText>

        {allItems.length > 0 ? (
          <FlatList
            data={allItems}
            renderItem={({ item, index }) => <EventItem item={item} />}
          />
        ) : (
          <ThemedText>No events available.</ThemedText> // Display message when no items are available
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  eventContainer: {
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  eventDetails: {
    flex: 1,
    justifyContent: "center",
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  eventTimeDate: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  eventLocation: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  eventDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  eventTypeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  eventTypeBadge: {
    backgroundColor: "#e0f7fa",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  eventTypeText: {
    fontSize: 12,
    color: "#00796b",
  },
});
