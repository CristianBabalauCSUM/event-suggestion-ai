import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useRef } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, FlatList, Dimensions, FlatList as FlatListType } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ModalHomePageSurvey() {
    const [isSurveyVisible, setSurveyVisible] = useState(true);
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string | null }>({
      question1: null,
      question2: null,
      question3: null,
    });
  
    const flatListRef = useRef<FlatListType<any>>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
    const surveyQuestions = [
      {
        id: '1',
        question: 'Do you want to go out today?',
        options: ['😄', '😐', '🙁'],
        stateKey: 'question1',
      },
      {
        id: '2',
        question: 'How social are you feeling?',
        options: ['😶', '😌', '😁'],
        stateKey: 'question2',
      },
      {
        id: '3',
        question: 'What do you feel like doing?',
        options: ['🏃‍♂️ Sport', '🧘‍♀️ Meditation', '🗣️ Communication', '📚 Study'],
        stateKey: 'question3',
      },
    ];
  
    const closeSurvey = () => setSurveyVisible(false);
  
    const handleOptionPress = (option: any, questionKey: any) => {
      setSelectedOptions((prev) => ({
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

    const handleBackPress = () => {
        if (currentQuestionIndex > 0) {
          flatListRef.current?.scrollToIndex({
            index: currentQuestionIndex - 1,
            animated: true,
          });
          setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
      };
  
      const renderQuestion = ({ item }: { item: { id: string; question: string; options: string[]; stateKey: string } }) => (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{item.question}</Text>
          <View
            style={[
              styles.optionContainer,
              item.stateKey === 'question3' && styles.verticalOptionContainer, // Align vertically for the last question
            ]}
          >
            {item.options.map((option: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined, index: React.Key | null | undefined) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedOptions[item.stateKey] === option && styles.selectedOption,
                ]}
                onPress={() => handleOptionPress(option, item.stateKey)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    
      const renderSubmitButton = () => (
        <TouchableOpacity
          style={[
            styles.submitButton,
            currentQuestionIndex === surveyQuestions.length - 1 && styles.activeSubmitButton,
          ]}
          onPress={closeSurvey}
          disabled={currentQuestionIndex !== surveyQuestions.length - 1}
        >
          <LinearGradient
            colors={['#6DD5FA', '#2980B9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    
      return (
        <Modal visible={isSurveyVisible} animationType="fade" transparent={true}>
          <View style={styles.blurBackground}>
            <View style={styles.surveyContainer}>
              <FlatList
                ref={flatListRef}
                data={surveyQuestions}
                renderItem={renderQuestion}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false} // Disable manual scrolling
              />
    
              {/* Render the Back button for navigation */}
              {currentQuestionIndex > 0 && (
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                  <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
              )}
    
              {/* Render the Submit button after all questions are answered */}
              {renderSubmitButton()}
            </View>
          </View>
        </Modal>
      );
  }
  
  const styles = StyleSheet.create({
    blurBackground: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
    },
    surveyContainer: {
      width: width * 0.9,
      height: height * 0.5,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      justifyContent: 'space-between',
    },
    questionContainer: {
      width: width * 0.9,
      justifyContent: 'center',
    },
    questionText: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    optionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    verticalOptionContainer: {
      flexDirection: 'column', // Align options vertically for the last question
      alignItems: 'center',
    },
    optionButton: {
      backgroundColor: '#f0f0f0',
      padding: 10,
      borderRadius: 10,
      width: 60,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5, // Add spacing between vertically aligned options
    },
    selectedOption: {
      backgroundColor: '#ADD8E6',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
    },
    optionText: {
      fontSize: 24,
    },
    submitButton: {
      width: '100%',
      height: 50,
      borderRadius: 30,
      overflow: 'hidden',
      opacity: 0.5,
    },
    activeSubmitButton: {
      opacity: 1,
    },
    gradientButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    submitButtonText: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
    },
    backButton: {
      position: 'absolute',
      bottom: 80,
      left: 20,
      padding: 10,
      borderRadius: 10,
      backgroundColor: '#2980B9',
    },
    backButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });