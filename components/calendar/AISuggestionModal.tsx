import React, { useEffect, useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SuggestedEvent from './SuggestedEvent';
import { ThemedText } from '../ThemedText';
import { EventData } from '@/lib/definitions';

type AiSuggestionModalProps = {
    date: string;
    isOpen: boolean;
    closeModal: () => void;
    todaySchedule: EventData[];
    otherSchedule: EventData[];
};

const { width, height } = Dimensions.get('window');

export default function AiSuggestionModal({ date, isOpen, closeModal, todaySchedule, otherSchedule }: AiSuggestionModalProps) {

    const [aiSuggestions, setAiSuggestions] = useState<EventData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const cleanScheduleData = (schedule: EventData[]) => {
            return schedule.map(({ image, ...rest }) => rest);
        };

        const getSuggestion = async () => {
            try {
                const response = await fetch("http://localhost:8000/schedule", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        today: cleanScheduleData(todaySchedule),
                        otherSchedule: cleanScheduleData(otherSchedule),
                    }),
                });

                const data = await response.json();
                console.log("Suggestions fetched:", data);
                const suggestions = JSON.parse(data.suggestions);
                suggestions.map((suggestion: any) => {
                    suggestion.image = require('@/assets/images/icon.png');
                    suggestion.date = date;
                    return suggestion;
                });
                setAiSuggestions(suggestions);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (aiSuggestions.length === 0 && isOpen) getSuggestion();
    }, [isOpen]);

    return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isOpen}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <ThemedText style={styles.modalTitle}>AI Suggestions | {date}</ThemedText>

                        <ScrollView style={styles.suggestionsList} contentContainerStyle={styles.scrollContent}>
                            {isLoading ? (
                                <ThemedText style={styles.noSuggestionsText}>Loading...</ThemedText>
                            ) : aiSuggestions.length ? (
                                aiSuggestions.map((event, index) => (
                                    <SuggestedEvent key={index} event={event} closeModal={closeModal} />
                                ))
                            ) : (
                                <ThemedText style={styles.noSuggestionsText}>No suggestions available</ThemedText>
                            )}
                        </ScrollView>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={closeModal}
                        >
                            <Ionicons name="close-circle" size={30} color="white" />
                            <ThemedText style={styles.closeButtonText}>Close</ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: width * 0.9,
        maxHeight: height * 0.8,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        elevation: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    suggestionsList: {
        width: '100%',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    noSuggestionsText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginVertical: 20,
    },
    closeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
});