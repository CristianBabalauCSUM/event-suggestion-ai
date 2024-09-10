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
      <ThemedText  reverse = {true} type="title" style = {{fontFamily : "KronaOne"}}>Hey  
        <ThemedText reverse = {true} type = "title" lightColor='#F7B538' style = {{fontFamily : "KronaOne"}} > {username}</ThemedText>,
        </ThemedText>
      <ThemedText reverse = {true}  type="subtitle" style = {{fontFamily : "Kodchasan"}}>Check out what is new today</ThemedText>
    </View>
  )
}

const styles = StyleSheet.create({
    headerContainer : {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        textAlign: 'center',
    }
})