import { ThemedText } from "@/components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useRef } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  FlatList as FlatListType,
} from "react-native";


export default function ModalHomePageSurvey() {
  const [isSurveyVisible, setSurveyVisible] = useState(true);

  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string | null;
  }>({
    question1: null,
    question2: null,
    question3: null,
  });

  const flatListRef = useRef<FlatListType<any>>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const surveyQuestions = [
    {
      id: "1",
      question: "Do you want to go out today?",
      options: ["😄", "😐", "🙁"],
      stateKey: "question1",
    },
    {
      id: "2",
      question: "How social are you feeling?",
      options: ["😶", "😌", "😁"],
      stateKey: "question2",
    },
    {
      id: "3",
      question: "What do you feel like doing?",
      options: ["🏃‍♂️ Sport", "🧘‍♀️ Meditation", "🗣️ Communication", "📚 Study"],
      stateKey: "question3",
    },
  ];

  const closeSurvey = () => {
    setSurveyVisible(false)
  };

  const handleOptionPress = (option: any, questionKey: any) => {

    setSelectedOptions( (prev) => ({
      ...prev,
      [questionKey]: option,
    }));

    if (currentQuestionIndex < surveyQuestions.length - 1) {
      if (flatListRef.current) {
        flatListRef.current?.scrollToIndex({
          index: currentQuestionIndex + 1,
          animated: true,
        });
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };


  const renderQuestion = ({
    item,
  }: {
    item: { id: string; question: string; options: string[]; stateKey: string };
  }) => (

    <View style={styles.questionContainer}>
      <ThemedText style={styles.questionText}>{item.question}</ThemedText>
      <View
        style={[
          styles.optionContainer,
          item.stateKey === "question3" && styles.verticalOptionContainer,
        ]}
      >
      
        {
        item.options.map(
          (
            option:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | null
              | undefined,
            index: React.Key | null | undefined
          ) => (
            item.stateKey === "question3" ? (
              <TouchableOpacity
              key={index}
              style={[
                styles.largeOptionButton,
                selectedOptions[item.stateKey] === option && styles.selectedOption,
              ]}
              onPress={() => handleOptionPress(option, item.stateKey)}
              > 
                <ThemedText type = "default" style={styles.optionText}>{option}</ThemedText>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedOptions[item.stateKey] === option && styles.selectedOption,
              ]}
              onPress={() => handleOptionPress(option, item.stateKey)}
              > 
                <ThemedText style={styles.optionText}>{option}</ThemedText>
              </TouchableOpacity>
            )
          )
        )}
      </View>
    </View>
  );

  const renderSubmitButton = () => (
    <TouchableOpacity
      style={[
        styles.submitButton,
        !Object.values(selectedOptions).some(option => option === null) &&
          styles.activeSubmitButton,
      ]}
      onPress={closeSurvey}
      disabled={
        Object.values(selectedOptions).some(option => option === null)
      }
    >
      <LinearGradient
        colors={["#6DD5FA", "#2980B9"]}
        start={{ x: 2, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientButton}
      >
        <ThemedText type = "subtitle" reverse = {true} style={styles.submitButtonText}>Submit</ThemedText>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <Modal visible={isSurveyVisible} animationType="fade" transparent={true}>
      <View style={styles.blurBackground}>
        <View style={styles.surveyContainer}>
          <TouchableOpacity onPress={closeSurvey}>
            <ThemedText>Close</ThemedText>
          </TouchableOpacity>

          <FlatList
            ref={flatListRef}
            data={surveyQuestions}
            renderItem={renderQuestion}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />

          {renderSubmitButton()}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  surveyContainer: {
    width: 350,
    height: 400,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignContent: "center",
    justifyContent: "space-between",
  },
  questionContainer: {
    width: 310,
    justifyContent: "center",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  verticalOptionContainer: {
    flexDirection: "column", // Align options vertically for the last question
    alignItems: "center",
    width: "100%",
  },
  optionButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5, // Add spacing between vertically aligned options
  },
  largeOptionButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: 'auto',
  },
  selectedOption: {
    backgroundColor: "#ADD8E6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  optionText: {
    fontSize: 20,
  },
  submitButton: {
    width: "100%",
    height: 50,
    borderRadius: 30,
    overflow: "hidden",
    opacity: 0.5,
  },
  activeSubmitButton: {
    opacity: 1,
  },
  gradientButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    bottom: 80,
    left: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#2980B9",
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
