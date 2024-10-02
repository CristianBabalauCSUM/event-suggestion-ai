import React, { useEffect, useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SuggestedEvent from './SuggestedEvent';
import { ThemedText } from '../ThemedText';
import { EventData } from '@/lib/definitions';
import { AISUGGESTION } from '@/constants/data/AISuggestions';

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

    useEffect(() => {
        const getSuggestion = async () => {
            setAiSuggestions(AISUGGESTION[date]);
        };
        if (isOpen) getSuggestion();
    }, [aiSuggestions.length, date, isOpen, otherSchedule, todaySchedule]);

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
                            {
                                aiSuggestions.map((event, index) => (
                                    <SuggestedEvent key={index} event={event} closeModal={closeModal} />
                                ))
                            }
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