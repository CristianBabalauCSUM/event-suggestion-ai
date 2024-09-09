import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import { ThemedText } from '../ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor';

type Props = {
    username: string
}

export default function HeaderWelcome(
   { username } : Props
) {
  return (
    <View style = {styles.headerContainer}>
      <ThemedText type="title" style = {{fontFamily : "KronaOne"}}>Hey  
        <ThemedText type = "title" lightColor='#F7B538' style = {{fontFamily : "KronaOne"}} > {username} </ThemedText>!
        </ThemedText>
      <ThemedText type="subtitle" style = {{fontFamily : "Kodchasan"}}>Hey, Chris!</ThemedText>
    </View>
  )
}

const styles = StyleSheet.create({
    headerContainer : {
        flex: 1,
        width: '100%',
        height: 'auto',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
})