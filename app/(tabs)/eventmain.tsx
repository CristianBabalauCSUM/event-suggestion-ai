import { Image, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import HeaderView from '@/components/HeaderView';
import SquareGridEvent from '@/components/eventmain/SquareGridEvent';

export default function EventMainScreen() {
  return (
    <View>

      <ScrollView
          scrollEventThrottle={16}
      >        
          <HeaderView headerBackgroundColor={'#A1CEDC'} /> 
          <SquareGridEvent />
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