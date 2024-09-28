import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderWelcome from '@/components/eventmain/HeaderWelcome';
import SliderEventDefaultTab from './eventmain/SliderEventDefaultTab';



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
                <SliderEventDefaultTab/>
            </SafeAreaView>
        </View>
        
    );
}

const styles = StyleSheet.create({
    headerStyle : {
        flex: 1,
        height: 410,        
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1B2432',
        flexDirection: 'column',
    },
    safeAreaView : { flex: 1, alignItems: "center", justifyContent: "center" , width: "100%", marginHorizontal: 10, paddingHorizontal: 10}

});