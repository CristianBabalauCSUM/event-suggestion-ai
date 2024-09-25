import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface CalendarGridProps {
  selectedDate: string;
  daysInMonth: number;
  onSelectDate: (day: string) => void;
}

const CalendarGrid = ({ selectedDate, daysInMonth, onSelectDate }: CalendarGridProps) => {
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
          onPress={() => onSelectDate(dayString)}
        >
          <ThemedText style={styles.dayText}>{i}</ThemedText>
        </TouchableOpacity>
      );
    }
    return days;
  };

  return <View style={styles.calendarGrid}>{renderCalendarDays()}</View>;
};

const styles = StyleSheet.create({
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
});

export default CalendarGrid;