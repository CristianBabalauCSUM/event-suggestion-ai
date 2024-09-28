import { View, StyleSheet, FlatList } from "react-native";
import React from "react";
import { SliderData } from "@/constants/data/SliderData";
import EventDefaultTab from "@/components/eventmain/EventDefaultTab";
import { router } from "expo-router";

export default function SliderEventDefaultTab() {
  return (
    <View style={styles.defaultSlider}>
      <FlatList
        data={SliderData}
        renderItem={({ item, index }) => (
          <EventDefaultTab
            item={item}
            index={index}
            containerStyle={{ width: 270, height: 250 }}
            onPress={() => {
              router.push({
                pathname: `/(events)/eventpage`,
                params: { item: JSON.stringify(item), showButton: true.toString() } // Serialize the item
              });
            }}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false} // Optional: hides the scroll indicator
      >
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  defaultSlider: {
    height: "auto",
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
