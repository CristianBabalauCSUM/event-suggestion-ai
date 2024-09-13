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
import SingleEvent from "@/components/calendar/SingleEvent";
import EventSection from "@/components/calendar/EventSection";

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
        <SingleEvent key={index} event={event} />
      ));
    }
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <SafeAreaView>
          <ThemedText reverse={true} type="title" style={styles.headerTitle}>Calendar</ThemedText>
        </SafeAreaView>
      </View>
      <View style={styles.safeArea}>
        <View style={styles.container}>
          <ThemedText style={styles.headerText}>&lt;   September 2024   &gt;</ThemedText>
          <View style={styles.calendarGrid}>{renderCalendarDays()}</View>
          <EventSection
            selectedDate={selectedDate}
            renderSchedules={renderSchedules}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({

  headerTitle: {
    fontSize: 30,
    fontWeight: "800",
    fontFamily: "KronaOne",
    color: "#F3A953",
    textAlign: "center",
    letterSpacing: 1,
  },
  headerContainer: {
    height: 120,
    backgroundColor: "#1B2432",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: "lightblue",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
  noEventText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default CalendarPage;
