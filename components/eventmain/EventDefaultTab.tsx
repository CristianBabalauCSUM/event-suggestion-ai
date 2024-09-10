import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Props = {
    event : {
        title : "Event Title",
        description : "Event Description",
        location : "Event Location",
        date : "Event Date",
        time : "Event Time",
        image : "Event Image",
    }
}

export default function EventDefaultTab(
    
) {
  return (
    <View style = {[ styles.defaultBlock, styles.shadowStyle ]}>
      
      
      <Text>EventDefaultTab</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    defaultBlock : { 
        flex: 1,
        height: 200, 
        width: 200,       
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0EFF4',
    },
    shadowStyle : {
        shadowColor: '#F7B538',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 0,
    },
})