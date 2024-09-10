import { View, Text, StyleSheet, FlatList} from 'react-native'
import React from 'react'
import { SliderData } from '@/data/SliderData'
import EventDefaultTab from '@/components/eventmain/EventDefaultTab'

export default function SliderEventDefaultTab() {
  return (
    <View style = { styles.defaultSlider }>
        <FlatList 
            data={SliderData} 
            renderItem = {({item, index}) => (
                    <EventDefaultTab item={item} index ={index} />
                )}
            horizontal
         > </FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
    defaultSlider : {
        height: 'auto',
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }
})