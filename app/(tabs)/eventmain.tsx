import { Image, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import HeaderView from '@/components/HeaderView';

export default function EventMainScreen() {
  return (
    <ScrollView
        onScroll={(event) => { console.log(event.nativeEvent.contentOffset)}}
        scrollEventThrottle={16}
    >        
        <HeaderView headerBackgroundColor={'#A1CEDC'}> 

        </HeaderView>
    </ScrollView>
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