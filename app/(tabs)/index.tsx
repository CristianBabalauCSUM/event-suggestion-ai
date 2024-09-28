import { View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderView from '@/components/HeaderView';
import SquareGridEvent from '@/components/eventmain/SquareGridEvent';
import ModalHomePageSurvey from '@/components/eventmain/quiz/ModalHomePageSurvey';
import { UserModal } from '@/components/users/UserModal';

export default function EventMainScreen() {

  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    setShowUserModal(true);
  }, [])

  return (
    <View>
      <UserModal visible={showUserModal} onClose={() => setShowUserModal(!showUserModal)} />
      <ModalHomePageSurvey />
      <ScrollView
        scrollEventThrottle={16}
      >
        <HeaderView headerBackgroundColor={'#A1CEDC'} />
        <SquareGridEvent headerText='Find new connections' subHeaderText='Check these activities' type='any' sliced={4} />
        <SquareGridEvent headerText='Let`s do some sports' subHeaderText='Active Lifestyle!' type='Exercise' sliced={4} />
        <SquareGridEvent headerText='Resturants and Bars' subHeaderText='Food and Drinks' type='any' sliced={4} />

      </ScrollView>
    </View>
  )
}