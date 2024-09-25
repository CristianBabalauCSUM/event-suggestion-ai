import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { ThemedText } from '../ThemedText';
import { router } from 'expo-router';
import { Event } from '@/constants/data/Schedules';

type SingleEventProps = {
    event: Event;
}

export default function SingleEvent({ event }: SingleEventProps) {
    return (
        <View style={styles.eventBox}>
            <TouchableOpacity
                style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}
                onPress={() => {
                    router.push({
                        pathname: `/(events)/eventpage`,
                        params: { item: JSON.stringify(event) } // Serialize the item
                    });
                }}
            >
                <View>
                    <ThemedText style={styles.eventTitle}>{event.title}</ThemedText>
                    <ThemedText>{event.time}</ThemedText>
                    <ThemedText>{event.location}</ThemedText>
                </View>
                <View>
                    <Image source={event.image} style={styles.image} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    eventBox: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: "#f0f8ff",
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 5,
        backgroundColor: "lightblue",
    },
})