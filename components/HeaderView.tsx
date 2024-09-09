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



type Props = PropsWithChildren<{
    headerBackgroundColor: string;
}>;

export default function HeaderView ({
    headerBackgroundColor 
} : Props) {
    return (
        <LinearGradient 
            colors={['#4c669f', '#F3F3F3']} // Top to bottom gradient
            style={[styles.headerStyle]}>
            <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}> 
                <HeaderWelcome username = "Chris"/>
            </SafeAreaView>
        </LinearGradient>
        
    );
}

const styles = StyleSheet.create({
    headerStyle : {
        flex: 1,
        height: 411,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#4c669f',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradientTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        opacity: 0.8,
      },
      gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      content: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        fontSize: 24,
        color: '#fff',
      },
});