import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SliderData } from "@/data/SliderData";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const daysInMonth = 30;

  const renderCalendarDays = () => {
    let days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dayString = `2024-09-${i < 10 ? `0${i}` : i}`;
      days.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.dayBox,
            selectedDate === dayString ? styles.selectedDay : null,
          ]}
          onPress={() => setSelectedDate(dayString)}
        >
          <ThemedText style={styles.dayText}>{i}</ThemedText>
        </TouchableOpacity>
      );
    }
    return days;
  };

  const renderSchedules = () => {
    const events = SliderData.filter(
      (event) => selectedDate === event.start.split("T")[0]
    );

    if (events.length === 0) {
      return <ThemedText style={styles.noEventText}>No Events</ThemedText>;
    } else {
      return events.map((event, index) => (
        <View key={index} style={styles.eventBox}>
          <TouchableOpacity
          style={{flexDirection: 'row', width: '100%',justifyContent: 'space-between'}}
            onPress={() => {
                router.push({
                    pathname: `/(events)/eventpage`,
                    params: { item: JSON.stringify(event) } // Serialize the item
                  });
            }}
          >
            <View>
              <ThemedText style={styles.eventTitle}>{event.title}</ThemedText>
              <ThemedText>{event.time}</ThemedText>
              <ThemedText>{event.location}</ThemedText>
            </View>
            <View>
              <Image source={event.image} style={styles.image} />
            </View>
          </TouchableOpacity>
        </View>
      ));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Calendar Section */}
        <ThemedText style={styles.headerText}>September 2024</ThemedText>
        <View style={styles.calendarGrid}>{renderCalendarDays()}</View>

        {/* Event Section */}
        <View style={styles.eventsSection}>
          <ThemedText type="subtitle" style={styles.eventHeader}>
            Events for {selectedDate || "Select a Date"}
          </ThemedText>
          <ScrollView>{renderSchedules()}</ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: "lightblue",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Ensure background color extends into the safe area
  },
  container: {
    flex: 1,
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  dayBox: {
    width: 50,
    height: 50,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  selectedDay: {
    backgroundColor: "#87CEEB",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventsSection: {
    flex: 1,
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  eventHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventBox: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f0f8ff",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  noEventText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default CalendarPage;
