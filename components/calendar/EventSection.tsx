import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ThemedText } from '../ThemedText'
import { Ionicons } from '@expo/vector-icons';
import NewEventModal from './NewEventModal';

type EventSectionProps = {
    selectedDate: string;
    renderSchedules: () => JSX.Element | JSX.Element[];
}

export default function EventSection({ selectedDate, renderSchedules }: EventSectionProps) {

    const [openNewEventModal, setOpenNewEventModal] = React.useState(false);

    return (
        <View style={styles.eventsSection}>
            <ThemedText type="subtitle" style={styles.eventHeader}>
                Events for {selectedDate || "Select a Date"}
            </ThemedText>
            <ScrollView>{renderSchedules()}</ScrollView>

            {
                selectedDate && (
                    <TouchableOpacity
                        style={styles.floatingButton}
                        onPress={() => {
                            setOpenNewEventModal(true);
                        }}
                    >
                        <Ionicons name="add" size={28} color="white" />
                    </TouchableOpacity>
                )
            }
            <NewEventModal
                    isOpen={openNewEventModal}
                    closeModal={() => setOpenNewEventModal(false)}
                    date={selectedDate}
                />
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
    floatingButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#87CEEB',
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
})