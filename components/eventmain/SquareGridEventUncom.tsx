import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { SliderData } from "@/data/SliderData";
import EventDefaultTab from "@/components/eventmain/EventDefaultTab";
import { ThemedText } from "../ThemedText";
import { router } from "expo-router";


const ItemSeparator = () => <View style={styles.separator} />;


export default function SquareGridEvent() {
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Check out some sport activities 🏓
      </ThemedText>
      <ThemedText type="subtitle">
        Events soon to come
        </ThemedText>

      <FlatList
        data={SliderData}
        renderItem={({ item, index }) => (
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
