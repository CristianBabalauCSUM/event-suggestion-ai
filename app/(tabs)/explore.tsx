import {
  StyleSheet,
  Image,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useState, memo } from "react";
import { getAllItemsAsync } from "@/lib/utils/AsyncStorage";
import { router, useFocusEffect } from "expo-router";
import React from "react";
import { EventData } from "@/lib/definitions";

const EventItem = memo(({ item }: {item : EventData}) => {
  if (!item) return null;
  const { title, image, end, time, location, date } = item;
  return (
    <TouchableOpacity
      style={styles.eventContainer}
      onPress={() => {
        router.push({
          pathname: `/(events)/eventpage`,
          params: { item: JSON.stringify(item), showButton: true.toString() },
        });
      }}
    >
      <Image source={image} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <ThemedText type="subtitle" style={styles.eventTitle}>{title}</ThemedText>
        <ThemedText style={styles.eventTimeDate}>
          {time} | {date}
        </ThemedText>
        <ThemedText style={styles.eventLocation}>{location}</ThemedText>
      </View>
    </TouchableOpacity>
  );
});

export default function Events() {
  const [allItems, setAllItems] = useState<EventData[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        const items = await getAllItemsAsync();
        setAllItems(items);
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