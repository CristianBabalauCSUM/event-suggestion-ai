import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { ThemedText } from './ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'react-native-linear-gradient';



type Props = PropsWithChildren<{
    headerBackgroundColor: string;
}>;

export default function HeaderView ({
    headerBackgroundColor 
} : Props) {
    return (
        <LinearGradient 
            colors={['#A1CEDC', '#1D3D47']}
            style={styles.headerStyle}>
            <SafeAreaView style={{ flex: 1 }}> 
                <ThemedText type="title">Welcome!</ThemedText>
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
        justifyContent: 'center',
        alignItems: 'center',
    }
});