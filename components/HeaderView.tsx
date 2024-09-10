import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { ThemedText } from './ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from 'react-native/Libraries/NewAppScreen';
import HeaderWelcome from '@/components/eventmain/HeaderWelcome';
import EventDefaultTab from '@/components/eventmain/EventDefaultTab';



type Props = PropsWithChildren<{
    headerBackgroundColor: string;
}>;

export default function HeaderView ({
    headerBackgroundColor 
} : Props) {
    return (
        <View 
            style={[styles.headerStyle]}>
            <SafeAreaView style={[styles.safeAreaView]}> 
                <HeaderWelcome username = "Chris"/>
                <EventDefaultTab />
            </SafeAreaView>
        </View>
        
    );
}

const styles = StyleSheet.create({
    headerStyle : {
        flex: 1,
        height: 411,        
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1B2432',
        flexDirection: 'column',
    },
    safeAreaView : { flex: 1, alignItems: "center", justifyContent: "center" , width: "100%", marginHorizontal: 10, paddingHorizontal: 10}

});