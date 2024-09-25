import {
  StyleSheet,
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState, useEffect, memo } from "react";
import { getAllItemsAsync } from "@/lib/utils/AsyncStorage";
import { router, useFocusEffect } from "expo-router";
import React from "react";

// Memoized EventItem component
const EventItem = memo(({ item }: any) => {
  const newItem = JSON.parse(item.value);
  if (!item || !item.value) return null;
  const { title, image, end, time, location } = newItem;

  return (
    <TouchableOpacity
      style={styles.eventContainer}
      onPress={() => {
        router.push({
          pathname: `/(events)/eventpage`,
          params: { item: JSON.stringify(newItem) },
        });
      }}
    >
      <Image source={image} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <ThemedText type="subtitle" style={styles.eventTitle}>{title}</ThemedText>
        <ThemedText style={styles.eventTimeDate}>
          {time} | {end.split("T")[0]}
        </ThemedText>
        <ThemedText style={styles.eventLocation}>{location}</ThemedText>
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
      <View style={styles.headerContainer}>
        <SafeAreaView>
          <ThemedText reverse={true} type="title" style={[styles.headerTitle, { fontFamily: "KronaOne" }]}>Your Events</ThemedText>
          <ThemedText reverse={true} type="subtitle" style={styles.headerSubtitle}>
            These are all your events
          </ThemedText>
        </SafeAreaView>
      </View>
      <View>
        {allItems.length > 0 ? (
          <FlatList
            data={allItems}
            renderItem={({ item }) => <EventItem item={item} />}
          />
        ) : (
          <ThemedText style={styles.noEventsText}>No events available.</ThemedText>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 150,
    backgroundColor: "#1B2432",
    padding: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "800",
    fontFamily: "KronaOne",
    color: "#F3A953",
    textAlign: "center",
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#E4B788",
    textAlign: "center",
    marginTop: 10,
    fontFamily: "Kodchasan",
  },
  noEventsText: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 50,
  },
  eventContainer: {
    flexDirection: "row",
    padding: 20,
    marginVertical: 12,
    backgroundColor: "#FFF",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 20,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  eventDetails: {
    flex: 1,
    justifyContent: "center",
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "600",
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
  },
});