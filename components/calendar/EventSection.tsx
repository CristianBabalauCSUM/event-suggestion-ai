import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ThemedText } from '../ThemedText'
import { Ionicons } from '@expo/vector-icons';
import CreateEventModal from './CreateEventModal';
import AiSuggestionModal from './AISuggestionModal';
import SingleEvent from './SingleEvent';
import { Event } from '@/constants/data/Schedules';

type EventSectionProps = {
    selectedDate: string;
    schedule: Event[];
    otherSchedule: Event[];
}

export default function EventSection({ selectedDate, schedule, otherSchedule }: EventSectionProps) {
    const [openNewEventModal, setOpenNewEventModal] = useState(false);
    const [openAiSuggestionModal, setOpenAiSuggestionModal] = useState(true);

    return (
        <View style={styles.eventsSection}>
            <ThemedText type="subtitle" style={styles.eventHeader}>
                Events for {selectedDate || "Select a Date"}
            </ThemedText>
            <ScrollView>
                {schedule.map((event, index) => (
                    <SingleEvent key={index} event={event} />
                ))}
            </ScrollView>

            {
                selectedDate && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.floatingButton}
                            onPress={() => {
                                setOpenAiSuggestionModal(true);
                            }}
                        >
                            <ThemedText style={styles.floatingButtonText}>AI Suggestion</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.floatingButton}
                            onPress={() => {
                                setOpenNewEventModal(true);
                            }}
                        >
                            <Ionicons name="add" size={28} color="white" />
                        </TouchableOpacity>
                    </View>
                )
            }
            <AiSuggestionModal
                isOpen={openAiSuggestionModal}
                closeModal={() => setOpenAiSuggestionModal(false)}
                todaySchedule={schedule}
                otherSchedule={otherSchedule}
            />
            <CreateEventModal
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
        marginTop: 0,
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
    buttonContainer: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1
    },
    floatingButton: {
        backgroundColor: '#2196F3',
        paddingHorizontal: 10,      
        paddingVertical: 10,         
        borderRadius: 50,            
        justifyContent: 'center',    
        alignItems: 'center',        
        marginHorizontal: 10,        
        flexDirection: 'row',        
        elevation: 3,               
        shadowColor: '#000',        
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    floatingButtonText: {
        color: '#fff',               
        fontSize: 16,               
        fontWeight: '600',        
    },
})