import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import HeaderView from '@/components/HeaderView';
import SquareGridEvent from '@/components/eventmain/SquareGridEvent';
import ModalHomePageSurvey from '@/components/eventmain/quiz/ModalHomePageSurvey';
import SuggestionSquareGrid from '@/components/eventmain/SuggestionSquareGrid';
import { Ionicons } from '@expo/vector-icons'; // Import Icon for the button
import { UserModal } from '@/components/users/UserModal';

export default function EventMainScreen() {
  const [showUserModal, setShowUserModal] = useState(true);
  const [showSurvey, setShowSurvey] = useState(false);
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);

  const handleSurveyComplete = () => {
    setShowSurvey(false);
    setIsSurveyCompleted(false);
    setIsSurveyCompleted(true);
  };

  const handleSurveyButtonPress = () => {
    setShowSurvey(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <UserModal visible={showUserModal} onClose={() => setShowUserModal(false)} />
      <ModalHomePageSurvey isVisibile={showSurvey} onComplete={handleSurveyComplete} />
      <TouchableOpacity 
        style={styles.floatingButton} 
        onPress={handleSurveyButtonPress}
      >
        <Ionicons name="compass" size={60} color="#3ABDD1" />
      </TouchableOpacity>

      <ScrollView scrollEventThrottle={16}>
        <HeaderView headerBackgroundColor={'#A1CEDC'} />
        <SuggestionSquareGrid 
          headerText='Suggested for you' 
          subHeaderText='Based on your survey' 
          sliced={6}
          isSurveyCompleted={isSurveyCompleted}  // Pass the survey completion status
        />
        <SquareGridEvent headerText='Find new connections' subHeaderText='Check these activities' type='any' sliced={4} />
        <SquareGridEvent headerText='Let`s do some sports' subHeaderText='Active Lifestyle!' type='Exercise' sliced={4} />
        <SquareGridEvent headerText='Resturants and Bars' subHeaderText='Food and Drinks' type='any' sliced={4} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1000,  // Ensures it floats above everything
  },
});
