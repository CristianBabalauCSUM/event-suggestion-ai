import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import EventDefaultTab from "@/components/eventmain/EventDefaultTab";
import { SliderData } from "@/constants/data/SliderData";
import { ThemedText } from "../ThemedText";
import { router } from "expo-router";
import { filterEvents } from "@/lib/utils/FilterEvents";


const ItemSeparator = () => <View style={styles.separator} />;

type Props = {
  headerText: string;
  subHeaderText: string;
  type: string | string[];
  sliced: number;
  anythingElse?: string;
};

export default function SquareGridEvent({headerText, subHeaderText, type = 'any', sliced = 4}: Props) {
  
  const data = filterEvents(SliderData, type);
  
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        {headerText}
      </ThemedText>
      <ThemedText type="subtitle" style = {styles.subtitle}>
        {subHeaderText}
        </ThemedText>

      <FlatList
        data={data.slice(0, sliced)}
        renderItem={ ({ item, index }) => (
          <EventDefaultTab
            item={item}
            index={index}
            containerStyle={{ width: 160, height: 160 }}
            textStyle={{ fontSize: 16, lineHeight: 20 }}
            onPress={() => {
              router.push({
                pathname: `/(events)/eventpage`,
                params: { item: JSON.stringify(item) } // Serialize the item
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
