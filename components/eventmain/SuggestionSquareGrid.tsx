import { StyleSheet, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import EventDefaultTab from "@/components/eventmain/EventDefaultTab";
import { SliderData } from "@/constants/data/SliderData";
import { ThemedText } from "../ThemedText";
import { router } from "expo-router";
import { filterEvents } from "@/lib/utils/FilterEvents";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ItemSeparator = () => <View style={styles.separator} />;

type Props = {
  headerText: string;
  subHeaderText: string;
  sliced: number;
  anythingElse?: string;
};

const checkSurvey = async () => {
     
   try {
    const value = await AsyncStorage.getItem("surveyChoice");
    if (value !== null) {
        // value previously stored
        return value;
    }
    } catch (e) {   
        return false;
    }
    return false;
}
export default function SuggestionSquareGrid({headerText, subHeaderText, sliced = 4, isSurveyCompleted}: any) {
    const [events, setEvents] = useState([]);  // Add state for the events
   
   useEffect(() => {
    if (isSurveyCompleted) {
        
      // Fetch and update suggestions based on survey completion
      // Example: Call a function to filter events based on the survey results
      // const newEvents = fetchFilteredEventsBasedOnSurvey();
      // setEvents(newEvents);
    }
  }, [isSurveyCompleted]);  // Watch for survey completion status


  return (

    <View style={styles.container} >
      <ThemedText type="title" style={styles.title}>
        {headerText}
      </ThemedText>
      <ThemedText type="subtitle" style = {styles.subtitle}>
        {subHeaderText}
        </ThemedText>


    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 20, // Adjust the height to set the vertical gap
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  subtitle: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 0,
    lineHeight: 30,
  },
  grid: {
    justifyContent: "center", // Center the grid content
  },
  row: {
    justifyContent: "space-between", // Add spacing between items in the row
  },
  itemContainer: {
    backgroundColor: "#A4413B",
    width: "48%", // Take about half of the row width, adjust for margins
    height: 120, // Fixed height for the boxes
    borderRadius: 10,
    marginBottom: 20, // Add some space below each item
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
