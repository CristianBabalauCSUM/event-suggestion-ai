import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import EventSection from "@/components/calendar/EventSection";
import { getEvents, getOtherEvents } from "@/lib/utils/FilterEvents";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import { getAllItemsAsync } from "@/lib/AsyncStorage";
import { EventData } from "@/lib/definitions";
import { SCHEDULE } from "@/constants/data/Schedules";
import { useIsFocused } from "@react-navigation/native";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const daysInMonth = 30;
  const [calendarSchedule, setCalendarSchedule] = useState<EventData[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchCalendarSchedule = async () => {
      const schedule = await getAllItemsAsync();
      setCalendarSchedule([...schedule, ...SCHEDULE]);
    };
    fetchCalendarSchedule();
  }, [isFocused]);

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
          <CalendarGrid
            selectedDate={selectedDate}
            daysInMonth={daysInMonth}
            onSelectDate={setSelectedDate}
          />
          <EventSection
            selectedDate={selectedDate}
            schedule={getEvents(calendarSchedule, selectedDate)}
            otherSchedule={getOtherEvents(calendarSchedule, selectedDate)}
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
