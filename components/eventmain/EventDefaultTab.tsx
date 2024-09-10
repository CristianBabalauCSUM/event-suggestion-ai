import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import React from "react";
import { EventSlide } from "@/data/SliderData";
import { ThemedText } from "../ThemedText";

type Props = {
  item: EventSlide;
  index: number;
};

export default function EventDefaultTab({ item, index }: Props) {
  return (
    <View style={[styles.shadowStyle]}>
      <ImageBackground
        source={item.image}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <View>
          <ThemedText style={styles.text} type = "title">{item.description}</ThemedText>
          <ThemedText style={styles.text} type = "subtitle">{item.description}</ThemedText>

        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    height: 250,
    width: 270,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "flex-end", // Ensures the text is positioned at the bottom
    backgroundColor: "#F0EFF4",
  },

  image: {
    borderRadius: 10, // Apply the borderRadius to the image itself
  },

  shadowStyle: {
    marginHorizontal: 10,
    shadowColor: "#F7B538",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 0,
  },
  text: {
    color: "black", // Set text color
    fontSize: 24, // Adjust as needed
    textAlign: "center", // Optional: Center the text
  },
});
