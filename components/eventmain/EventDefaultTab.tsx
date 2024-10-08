import {
  View,
  StyleSheet,
  ImageBackground,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ThemedText } from "../ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import { truncateText } from "@/lib/utils/textUtils";
import { EventData } from "@/lib/definitions";

type Props = {
  item: EventData;
  index: number;
  onPress: () => void;
};
type Styling = {
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
};

export default function EventDefaultTab({
  item,
  index,
  containerStyle,
  textStyle,
  onPress,
}: Props & Styling) {


  return (
    <View style={[styles.shadowStyle]}>
      <TouchableOpacity onPress={onPress}>
        <ImageBackground
          source={item.image}
          style={[styles.imageBackground, containerStyle]}
          imageStyle={styles.image}
        >
          <LinearGradient
            colors={["rgba(255,255,255,0.05)", "rgba(247,181,56,0.8)"]} // Gradient colors
            style={styles.gradientOverlay}
          />
          <View style={{ padding: 10 }}>
            <ThemedText style={[styles.text, textStyle]} type="title">
              {truncateText(item.title, 20)}
            </ThemedText>
            <ThemedText style={[styles.text, textStyle]} type="subtitle">
              {truncateText(item.description, 20)}
            </ThemedText>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "flex-end", // Ensures the text is positioned at the bottom
    backgroundColor: "#F0EFF4",
    tintColor: "red",
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
    textAlign: "left", // Optional: Center the text
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject, // Ensures the gradient covers the entire ImageBackground
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Ensures the overlay covers the entire ImageBackground
    backgroundColor: "rgba(0, 0, 0, 0.15)", // Tint color (red in this case) with opacity
  },
});
