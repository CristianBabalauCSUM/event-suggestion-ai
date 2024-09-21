import { Image, StyleSheet, Text, View, ScrollView, Modal } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import HeaderView from '@/components/HeaderView';
import SquareGridEvent from '@/components/eventmain/SquareGridEvent';
import ModalHomePageSurvey from '@/components/eventmain/quiz/ModalHomePageSurvey';

export default function EventMainScreen() {
  return (
    <View>
      <ModalHomePageSurvey />
      <ScrollView
          scrollEventThrottle={16}
      >        
          <HeaderView headerBackgroundColor={'#A1CEDC'} /> 

          <SquareGridEvent headerText='Find new connections' subHeaderText='Check these activities' type = 'any' sliced={4}/>
          
          <SquareGridEvent headerText='Let`s do some sports' subHeaderText='Active Lifestyle!' type = 'Exercise' sliced={4}/>

          <SquareGridEvent headerText='Resturants and Bars' subHeaderText='Food and Drinks' type = 'any' sliced={4}/>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    headerContainer : {
        backgroundColor: '#A1CEDC',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    }
})