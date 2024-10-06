import { StyleSheet, View, FlatList, Text } from "react-native";
import React, { useEffect, useState } from "react";
import EventDefaultTab from "@/components/eventmain/EventDefaultTab";
import { SliderData } from "@/constants/data/SliderData";
import { ThemedText } from "../ThemedText";
import { router } from "expo-router";
import { filterEvents } from "@/lib/utils/FilterEvents";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sortEventsBySurvey } from "@/lib/utils/EventScoring";
import { EventData } from "mapbox-gl";
import EventSuggestTab from "./EventSuggestTab";

const ItemSeparator = () => <View style={styles.separator} />;

const checkSurvey = async () => {
     
   try {
    const value = await AsyncStorage.getItem("surveyChoice");
    if (value !== null) {
        // value previously stored
        return value;
    }
    } catch (e) {   
        return null;
    }
    return null;
}


export default function SuggestionSquareGrid({headerText, subHeaderText, sliced = 4, isSurveyCompleted}: any) {
    const [events, setEvents] = useState<EventData[]>([]);  // Add state for the events
   
    useEffect(() => {
        if (isSurveyCompleted) {
          const fetchSurveyData = async () => {
            try {
              const value = await checkSurvey();
              if (value !== null) {
                const surveyAnswers = JSON.parse(value);
                const newEvents = sortEventsBySurvey(SliderData, surveyAnswers);
                setEvents(newEvents);
              }
            } catch (e) {
              console.log(e);
            }
          };
          fetchSurveyData();
        }
      }, [isSurveyCompleted]);  // Dependency on survey completion status
    if (!isSurveyCompleted) {
        return null;  // Return null if the survey is not completed, meaning nothing is rendered
    }

    return (

        <View style={styles.container} >
        <ThemedText type="title" style={styles.title}>
            {headerText}
        </ThemedText>
        <ThemedText type="subtitle" style = {styles.subtitle}>
            {subHeaderText}
            </ThemedText>
            <FlatList
            data={events.slice(0, sliced)}
            renderItem={ ({ item, index }) => (
            <EventSuggestTab
                item={item}
                index={index}
                containerStyle={{ width: 160, height: 160 }}
                textStyle={{ fontSize: 16, lineHeight: 20 }}
                onPress={() => {
                router.push({
                    pathname: `/(events)/eventpage`,
                    params: { item: JSON.stringify(item), showButton: true.toString()}
                });
                }}
            />
            )}
            
            numColumns={2}
            scrollEnabled={false} // Disable FlatList scrolling to prevent conflicts
            columnWrapperStyle={styles.row} // Style for the row
            contentContainerStyle={styles.grid} // Style for the whole grid
            ItemSeparatorComponent={ItemSeparator} // Add vertical gap

        />
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


