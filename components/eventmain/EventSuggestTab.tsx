import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import { truncateText } from "@/lib/utils/textUtils";
import { EventData } from "@/lib/definitions";
import { Ionicons } from '@expo/vector-icons';  // Icons for Like and Dislike buttons
import { captureMessage } from "@sentry/react-native";

type Props = {
  item: EventData;
  index: number;
  onPress: () => void;
};
type Styling = {
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
};

export default function EventSuggestTab({
  item,
  index,
  containerStyle,
  textStyle,
  onPress,
}: Props & Styling) {

  // Track if like/dislike has been selected
  const [selection, setSelection] = useState<"like" | "dislike" | null>(null);

  const handleLike = () => {

    if (!selection) {
      setSelection("like");
    }
    captureMessage("Action: Liked event", {
        level: "info",
        extra: { 
            type : "like",
            title: item.title 
        },
    })

  };

  const handleDislike = () => {

    if (!selection) {
      setSelection("dislike");
    }

    captureMessage("Action: Disliked event", {
        level: "info",
        extra: { 
            type : "dislike",
            title: item.title 
        },
    })
  };

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

            {/* Like and Dislike buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.likeButton,
                  selection === "like" && styles.selectedButton,
                ]}
                onPress={handleLike}
                disabled={!!selection} // Disable after selection
              >
                <Ionicons
                  name="thumbs-up"
                  size={24}
                  color={selection === "like" ? "green" : "black"}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.dislikeButton,
                  selection === "dislike" && styles.selectedButton,
                ]}
                onPress={handleDislike}
                disabled={!!selection} // Disable after selection
              >
                <Ionicons
                  name="thumbs-down"
                  size={24}
                  color={selection === "dislike" ? "red" : "black"}
                />
              </TouchableOpacity>
            </View>
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
  
    buttonContainer: {
      flexDirection: "row",
      marginTop: 10, // Add spacing between the text and buttons
      justifyContent: "space-between",
      width: 'auto', // Adjust button container width
    },
  
    likeButton: {
      alignItems: "center",
      justifyContent: "center",
    },
  
    dislikeButton: {
      alignItems: "center",
      justifyContent: "center",
    },
  
    selectedButton: {
      opacity: 0.5, // Make selected button visually distinct (optional)
    },
  });