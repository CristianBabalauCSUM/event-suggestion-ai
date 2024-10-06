import { View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderView from '@/components/HeaderView';
import SquareGridEvent from '@/components/eventmain/SquareGridEvent';
import ModalHomePageSurvey from '@/components/eventmain/quiz/ModalHomePageSurvey';
import { UserModal } from '@/components/users/UserModal';
import SuggestionSquareGrid from '@/components/eventmain/SuggestionSquareGrid';

export default function EventMainScreen() {

  const [showUserModal, setShowUserModal] = useState(false);
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);

  useEffect(() => {
    setShowUserModal(true);
  }, []);

  // Callback function to update survey status
  const handleSurveyComplete = () => {
    setIsSurveyCompleted(true);
  };



  return (
    <View>
      {showUserModal && (
        <ModalHomePageSurvey onComplete={handleSurveyComplete} />
      )}      
      <ScrollView
        scrollEventThrottle={16}
      >
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