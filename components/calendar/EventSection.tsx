import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedText } from '../ThemedText'

type EventSectionProps = {
    selectedDate: string;
    renderSchedules: () => JSX.Element | JSX.Element[];
}

export default function EventSection({ selectedDate, renderSchedules }: EventSectionProps) {
    return (
        <View style={styles.eventsSection}>
            <ThemedText type="subtitle" style={styles.eventHeader}>
                Events for {selectedDate || "Select a Date"}
            </ThemedText>
            <ScrollView>{renderSchedules()}</ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    eventsSection: {
        flex: 1,
        marginTop: 20,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderColor: "#ddd",
        borderWidth: 1,
    },
    eventHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
})